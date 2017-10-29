import { AccountSetupPage } from '../account-setup/account-setup';
import { SettingsPage } from '../settings/settings';
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { Account } from '../../client-lib';
import { getAccount } from '../../store/selectors/auth.selectors';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  account$: Observable<Account> = getAccount(this.redux);

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public redux: NgRedux<any>
  ) {
  }

  ionViewDidLoad() {
    // this.edit();
  }

  settings() {
    this.modalCtrl.create(SettingsPage).present();
  }

  edit() {
    this.navCtrl.push(AccountSetupPage);
  }
}
