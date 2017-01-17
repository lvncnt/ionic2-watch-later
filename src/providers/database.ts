import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform, Events } from 'ionic-angular';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

    private storage: SQLite;
    private isOpen: boolean;

    constructor(private platform: Platform, public events: Events) {
        if (!this.isOpen) {
            this.storage = new SQLite();
            this.storage.openDatabase({ name: "data.db", location: "default" }).then(() => {
                this.storage
                    .executeSql("CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY, title TEXT, release_date TEXT, vote_average REAL, runtime INTEGER, overview TEXT, poster_path TEXT, add_date INTEGER)", []);
                this.isOpen = true;
            });
        }
    }

    getMovies() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then((readySource) => {
                this.storage.executeSql("SELECT * FROM movie ORDER BY add_date DESC", []).then((data) => {
                    let movies = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            movies.push({
                                id: data.rows.item(i).id,
                                title: data.rows.item(i).title,
                                release_date: data.rows.item(i).release_date,
                                vote_average: data.rows.item(i).vote_average,
                                runtime: data.rows.item(i).runtime,
                                overview: data.rows.item(i).overview,
                                poster_path: data.rows.item(i).poster_path,
                                add_date: data.rows.item(i).add_date
                            });
                        }
                    }
                    resolve(movies);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    getMovieCount() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then((readySource) => {
                this.storage.executeSql("SELECT count(*) AS count FROM movie", []).then((data) => {
                    resolve(data.rows.item(0).count);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    addMovie(id: number, title: string, release_date: string, vote_average: number, runtime: number, overview: string, poster_path: string) {
        let add_date = new Date().getTime();
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO movie (id, title, release_date, vote_average, runtime, overview, poster_path, add_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [id, title, release_date, vote_average, runtime, overview, poster_path, add_date]).then((data) => {
                    // publish an event when a movie is added
                    this.events.publish('watchlist:changed');

                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
    }

    removeMovie(id) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("DELETE FROM movie WHERE id = ?", [id]).then((data) => {
                // publish an event when a movie is removed
                this.events.publish('watchlist:changed');

                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

}
