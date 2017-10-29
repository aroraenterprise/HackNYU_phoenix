import { AuthState } from '../store/auth/auth.state';
import { NgRedux } from '@angular-redux/store';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ModalController, Nav, Platform } from 'ionic-angular';

import { AccountSetupPage } from '../pages/account-setup/account-setup';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { AuthActions } from '../store/auth/auth.actions';
import { getAccount, getAuth } from '../store/selectors/auth.selectors';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = LoginPage;
  isLoggedIn: boolean = false;

  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    modalCtrl: ModalController,
    redux: NgRedux<any>
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      AuthActions.init();
      getAuth(redux).subscribe((auth: AuthState) => {
        if (auth.loading)
          return;
        if (!auth.account) {
          this.isLoggedIn = false;
          this.nav.setRoot(LoginPage);
        } else if (!this.isLoggedIn) {
          this.isLoggedIn = true;
          this.nav.setRoot(auth.account.showSetup ? AccountSetupPage : ProfilePage);
        }
      })
    });
  }
}

