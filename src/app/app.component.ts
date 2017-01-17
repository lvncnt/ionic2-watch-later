import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabPage } from '../pages/tab/tab';
 
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage = TabPage;

  // List of pages that can be accessed from the left menu
  utilPages: PageInterface[] = [
    { title: 'Filter', component: TabPage, icon: 'options' },
    { title: 'Search', component: TabPage, icon: 'search' }
  ];

  constructor(platform: Platform, public events: Events,) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page: PageInterface){
    if(page.index){
       this.nav.setRoot(page.component, {tabIndex: page.index - 1});
    }else{
      if(page.title === 'Filter'){
         this.events.publish('home:presentfilter');
      }else if(page.title === 'Search'){
         this.events.publish('home:presentsearch');
      }
    }
  }
}
