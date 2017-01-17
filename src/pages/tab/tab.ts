import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Database } from '../../providers/database';
import { HomePage } from '../home/home';
import { WatchlistPage } from '../watchlist/watchlist';
import { AboutPage } from '../about/about';

/*
  Generated class for the Tab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tab.html'
})
export class TabPage {

  selectedIndex: number;
  watchlist: Number; 

  tab1Root: any = HomePage;
  tab2Root: any = WatchlistPage;
  tab3Root: any = AboutPage;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public events: Events, public database: Database) {
    this.selectedIndex = navParams.data.tabIndex || 0;
    this.getMovieCount(); 
    this.listenToWatchlistEvents(); 
  }
 
  listenToWatchlistEvents(){
    this.events.subscribe('watchlist:changed', () => {
      this.getMovieCount(); 
    });
  }

  getMovieCount(){
    this.database.getMovieCount().then((data) => {
      this.watchlist = <Number>data;
    }, (error) => {
      this.watchlist = null; 
    }); 
  }
 

}
