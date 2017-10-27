import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { AuthActions } from '../../store/auth/auth.actions';
import { getAuth } from '../../store/selectors/auth.selectors';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authLoading$: Observable<boolean> = getAuth(this.redux, ['loading']);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public redux: NgRedux<any>
  ) {
  }

  ionViewDidLoad() {
  }

  login() {
    AuthActions.login();
  }

}
