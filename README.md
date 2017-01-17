# ![alt tag](https://raw.githubusercontent.com/lvncnt/ionic2-watch-later/master/resources/android/icon/drawable-ldpi-icon.png) Watch Later
----------
This app was built using the [Ionic 2 framework](http://ionic.io/2). By consuming the [Movie Database API](https://www.themoviedb.org), it allows user to search a movie and add or remove a movie from the Watchlist.   

## Features
* List Popular Movies
* View Movie Details
* Search Movies
* Filter Movies by Genre
* Share Movie
* Save or Remove Movie from Watchlist

![alt tag](https://raw.githubusercontent.com/lvncnt/ionic2-watch-later/master/screenshots/HomePage.png)


## Quickstart
#### Setup Ionic 
*npm* was used as the main package manager for the app. The Ionic CLI and Cordova can be installed using the following command:
```
npm install -g ionic cordova
```

#### Setup the TMDb API
This app uses TMDb as the movie data source, so an API key from TMDb is needed to run this app. You can sign up a TMDb user account, login to your account page on TMDb, and register for an API key through [here](https://www.themoviedb.org/account/signup) and replace the variable `TMDB_API_KEY`with the key you applied in the `src/providers/movie-service.ts` file.  

For detailed documentation of API and how to get started on TMDb, you can read it [here](https://developers.themoviedb.org/3/getting-started).

#### Run in a browser 
1. clone the repo `git clone https://github.com/lvncnt/ionic2-watch-later.git`
2. run `npm install` 
3. run `ionic serve` 

## Dependencies

#### Setup the Environment Variables
* Set `JAVA_HOME` Environment Variable to the JDK directory
* Set `ANDROID_HOME` Environment Variable to your android SDK directory


#### Run on an Android emulator 

1. The following Cordova plugins are needed to run the app on Android emulators like Genymotion.

|                         |               |
 ----------------- | ---------------------------- | ------------------
| `cordova-sqlite-storage`            | Native interface to SQLite for PhoneGap/Cordova |
| `cordova-plugin-x-socialsharing`            | Share text, images (and other files), or a link via the native sharing widget of your device. |
| `cordova-plugin-whitelist` | Cordova Whitelist Plugin |

For how to add the above plugins to your app using the CLI, you can read it [here](https://cordova.apache.org/docs/en/latest/guide/cli/#add-plugins).

2. Add support for the android platform:

```
ionic platform add android
```

3. Build and run the project in emulator

```
ionic run android
```

## Demo

The linked demo was a test run on a Google Nexus 7 Genymotion emulator with API level 22.  

[![MetroFramework](https://i.ytimg.com/vi/RlA_EUv9RrA/1.jpg)](https://youtu.be/RlA_EUv9RrA)

