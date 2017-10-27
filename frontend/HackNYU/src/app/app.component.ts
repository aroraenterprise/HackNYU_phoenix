import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ModalController, Platform } from 'ionic-angular';

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

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    modalCtrl: ModalController,
    redux: NgRedux<any>
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      AuthActions.init();
      getAccount(redux).subscribe(account => {
        splashScreen.hide();
        if (account) {
          this.rootPage = account.showSetup ? AccountSetupPage : ProfilePage;
        } else {
          this.rootPage = LoginPage;
        }
      })
    });
  }
}

