import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MovieService } from '../../providers/movie-service';

/*
  Generated class for the MovieFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-movie-filter',
  templateUrl: 'movie-filter.html'
})
export class MovieFilterPage {

  genres: Array<{ name: string, id: number, isChecked: boolean }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private movieService: MovieService) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedGenreNames = this.navParams.get('data');
    let map = this.movieService.getGenres();

    Object.keys(map).forEach((key) => {
      this.genres.push({
        name: map[key],
        id: parseInt(key),
        isChecked: (excludedGenreNames.indexOf(parseInt(key)) === -1)
      });
    });
  }

  applyFilters() {
    let excludedGenreNames = this.genres.filter(c => !c.isChecked).map(c => c.id);
    this.dismiss(excludedGenreNames);
  }

  resetFilters() {
    this.genres.forEach(genre => {
      genre.isChecked = true;
    });
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
