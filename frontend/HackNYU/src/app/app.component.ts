import { ProfilePage } from '../pages/profile/profile';
import { getAccount } from '../store/selectors/auth.selectors';
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { AuthActions } from '../store/auth/auth.actions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    redux: NgRedux<any>
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      AuthActions.init();
      getAccount(redux).subscribe(account => {
        if (account) {
          this.rootPage = ProfilePage;
        } else {
          this.rootPage = LoginPage;
        }
      })
    });
  }
}

