import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { MovieService } from '../../providers/movie-service';
import { MovieDetailPage } from '../movie-detail/movie-detail';
import { MovieFilterPage } from '../movie-filter/movie-filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public movieData: any;
  private movie: any;
  public queryText: string = '';
  private excludeGenres = [];
  private page: number = 1;
  public hasSearchBar: boolean = false; 

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, public navParams: NavParams,
    private movieService: MovieService, public events: Events) {
      this.listenToUtilEvents(); 
  }

  ngOnInit() {
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  listenToUtilEvents(){
     this.events.subscribe('home:presentfilter', () => {
       this.presentFilter(); 
     });

     this.events.subscribe('home:presentsearch', () => {
       this.hasSearchBar = ! this.hasSearchBar; 
     });

  }
 
  getMovies() {
    this.movieService.getNowPlaying(this.page.toString(), this.queryText, this.excludeGenres).subscribe(
      data => {
        this.movieData = data;
      },
      err => console.error(err),
      () => console.log('getMovies completed')
    );
 
  }

  goToMovieDetail(id) {
    this.movieService.getMovieDetail(id).subscribe(
      data => {
        this.movie = data.json();
        this.navCtrl.push(MovieDetailPage, { movie: this.movie });
      },
      err => console.error(err),
      () => console.log('getMovieDetail completed')
    );

  }

  presentFilter() {
    let modal = this.modalCtrl.create(MovieFilterPage, { data: this.excludeGenres });
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeGenres = data;
        this.page = 1; 
        this.getMovies();
      }
    });
  }

  doSearch(){
    this.page = 1; 
    this.getMovies(); 
  }

  onCancel(){
    this.hasSearchBar = ! this.hasSearchBar; 
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.page++;

      this.movieService.getNowPlaying(this.page.toString(), this.queryText, this.excludeGenres).subscribe(
        data => {
          data.forEach(element => {
            this.movieData.push(element);
          });

        },
        err => console.error(err)
      );

      infiniteScroll.complete();
    }, 500);
  }


}
