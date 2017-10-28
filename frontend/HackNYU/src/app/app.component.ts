import { NgRedux } from '@angular-redux/store';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ModalController, Nav, Platform } from 'ionic-angular';

import { AccountSetupPage } from '../pages/account-setup/account-setup';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { AuthActions } from '../store/auth/auth.actions';
import { getAccount } from '../store/selectors/auth.selectors';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = LoginPage;

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
      getAccount(redux).subscribe(account => {
        if (account) {
          this.nav.setRoot(account.showSetup ? AccountSetupPage : ProfilePage);
        } else {
          this.nav.setRoot(LoginPage);
        }
      })
    });
  }
}

