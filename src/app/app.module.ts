import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { JsonpModule } from '@angular/http'; 
import { MomentModule } from 'angular2-moment'; 
import { MovieService } from '../providers/movie-service'; 
import { Database } from '../providers/database'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MovieFilterPage } from '../pages/movie-filter/movie-filter'; 
import { AboutPage } from '../pages/about/about'; 
import { MovieDetailPage } from '../pages/movie-detail/movie-detail'; 
import { WatchlistPage } from '../pages/watchlist/watchlist'; 
import { TabPage } from '../pages/tab/tab';

@NgModule({
  declarations: [
    MyApp,
    HomePage, MovieFilterPage, 
    AboutPage, 
    MovieDetailPage, 
    WatchlistPage, 
    TabPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), JsonpModule, MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, MovieFilterPage,
    AboutPage, 
    MovieDetailPage, 
    WatchlistPage, 
    TabPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, MovieService, Database]
})
export class AppModule {}
