import { AuthActions } from '../store/auth/auth.actions';
import { Component } from '@angular/core';
import Auth0Cordova from '@auth0/cordova';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova')) {
        //handles redirect for Auth0
        (<any>window).handleOpenURL = (url) => {
          Auth0Cordova.onRedirectUri(url);
        };
      } else {
        AuthActions.init();
      }
    });
  }
}

