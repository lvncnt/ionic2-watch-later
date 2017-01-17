import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import { Database } from '../../providers/database'

/*
  Generated class for the UserDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html'
})
export class MovieDetailPage {

  public movie;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public database: Database
  ) {
    this.movie = navParams.get('movie');
  }

  presentActionSheet(event) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose ...',
      buttons: [
        {
          text: 'Add to Watchlist',
          icon: 'heart',
          handler: () => {
            this.addWatchlist();
          }
        },
        {
          text: 'Link to IMDb',
          icon: 'film',
          handler: () => {
            this.closeIMDB();
          }
        },
        {
          text: 'Link to TMDb',
          icon: 'videocam',
          handler: () => {
            this.closeTMDB();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  closeIMDB() {
    let url = "http://www.imdb.com/title/" + this.movie.imdb_id;
    window.open(url, '_blank');
  }

  closeTMDB() {
    let url = "https://www.themoviedb.org/redirect?external_source=imdb_id&external_id=" + this.movie.imdb_id;
    window.open(url, '_blank');
  }

  addWatchlist() {
    let title = "Movie Added";
    this.database.addMovie(this.movie.id, this.movie.title,
      this.movie.release_date, this.movie.vote_average,
      this.movie.runtime, this.movie.overview, this.movie.poster_path).then((result) => {

      }, (error) => {
        console.log("ERROR ADD Watchlist: ", error);
        title = "Movie already added";
      }).then(() => {
        let alert = this.alertCtrl.create({
          title: title,
          buttons: [{
            text: 'OK',
            handler: () => {
            }
          }]
        });
        alert.present();
      });

  }

  share() {
    SocialSharing.share(this.movie.title + "\n" + this.movie.overview,
      this.movie.title, null, "http://www.imdb.com/title/" + this.movie.imdb_id);
  }

}
