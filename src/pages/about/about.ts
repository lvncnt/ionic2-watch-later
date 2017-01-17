import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  slides = [
    {
      title: "Welcome to the Docs!",
      description: "This app was built with <a href=\"https://angular.io/\">Angular 2</a> and <a href=\"http://ionic.io/2\">Ionic 2</a> framework",
      image: "assets/img/ionic-angular.png",
    },
    {
      title: "What is Ionic?",
      description: "It displays a list of popular movies currently in theaters by consuming the <a href=\"https://www.themoviedb.org\">Movie Database API</a>. Links of a movie to the <a href=\"https://www.themoviedb.org\">Movie Database</a> as well <a href=\"http://www.imdb.com/\">IMDB</a> are provided in the movie detail page. ",
      image: "assets/img/tmdb.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "User can search a movie by use of this app. Backended by the <a href=\"https://cordova.apache.org/docs/en/latest/cordova/storage/storage.html\">Apache Cordova SQLite storage</a>, it also allows user to add or remove a movie from the Watchlist. ",
      image: "assets/img/sqlite.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
  }

}
