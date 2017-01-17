import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, AlertController } from 'ionic-angular';
import { MovieService } from '../../providers/movie-service';
import { Database } from '../../providers/database';
import { MovieDetailPage } from '../movie-detail/movie-detail';

/*
  Generated class for the Watchlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-watchlist',
  templateUrl: 'watchlist.html'
})
export class WatchlistPage {

  public watchlist: Array<Object>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public database: Database, 
    private movieService: MovieService) { }

  public ionViewDidEnter() {
    setTimeout(() => {
      this.load();
    }, 100);
  }

  public load() {

    this.database.getMovieCount(); 

    this.database.getMovies().then((data) => {
      this.watchlist = <Array<Object>>data;
    }, (error) => {
      console.log("ERROR LOAD: " + JSON.stringify(error));
    });
  }

  public goToMovieDetail(movie) {
    this.movieService.getMovieDetail(movie.id).subscribe(
      data => {
        this.navCtrl.push(MovieDetailPage, { movie: data.json() });
      },
      err => console.error(err),
      () => console.log('goToMovieDetail completed')
    );
    
  }

  public removeWatchlist(slidingItem: ItemSliding, movie) {
    let alert = this.alertCtrl.create({
      title: movie.title,
      message: 'Would you like to remove this movie from your watchlist?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.database.removeMovie(movie.id).then((result) => {

            }, (error) => {
              console.log("ERROR REMOVE Watchlist: ", error);
            }).then(() => {
              this.load();
              slidingItem.close();
            });

          }
        }
      ]
    });
    alert.present();
  }

}
