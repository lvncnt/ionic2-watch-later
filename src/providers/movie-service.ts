import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MovieService {

  private apiKey = 'TMDB_API_KEY'
  private tmdbMovie = 'https://api.themoviedb.org/3/movie/';
  private tmdbMovieSearch = 'https://api.themoviedb.org/3/search/movie';
  private tmdbGenre = 'https://api.themoviedb.org/3/genre/movie/list';
  private genreMap: any;

  constructor(public http: Http, private jsonp: Jsonp) {
    if (!this.genreMap) {
      this.loadGenre();
    }
  }

  loadGenre() {
    let params = new URLSearchParams();
    params.set('api_key', this.apiKey);
    params.set('language', 'en-US');
    params.set('page', '1');
    params.set('callback', 'JSONP_CALLBACK');
    this.jsonp.get(this.tmdbGenre, { search: params }).subscribe(
      data => {
        this.genreMap = {};
        data.json().genres.forEach(element => {
          this.genreMap[element.id] = element.name;
        });
      }
    );
  }

  getGenres() {
    return this.genreMap;
  }

  getNowPlaying(page, queryText, excludeGenres) {
    let params = new URLSearchParams();
    params.set('api_key', this.apiKey);
    params.set('language', 'en-US');
    params.set('page', page);
    params.set('callback', 'JSONP_CALLBACK');

    let url = this.tmdbMovie + 'now_playing';
    if (queryText) {
      url = this.tmdbMovieSearch;
      params.set('query', queryText);
    }
 
    return this.jsonp.get(url, { search: params }).map(
      data => {
        let movies = data.json().results;
        movies.forEach(element => {
          element.hide = false;
          element.genre = [];
          if (element.genre_ids) {
            element.genre_ids.forEach(id => {
              if (excludeGenres.indexOf(id) !== -1) {
                element.hide = true;
              }
              if (this.genreMap[id]) {
                element.genre.push(this.genreMap[id]);
              }
            });
          }
        });

        return movies;
      }
    );
  }

  getMovieDetail(id) {
    let params = new URLSearchParams();
    params.set('api_key', this.apiKey);
    params.set('language', 'en-US');
    params.set('callback', 'JSONP_CALLBACK');
    return this.jsonp.get(this.tmdbMovie + "" + id, { search: params });
  }

}
