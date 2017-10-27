import { AuthActions } from '../../store/auth/auth.actions';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { getAuth } from '../../store/selectors/auth.selectors';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  authLoading$: Observable<boolean> = getAuth(this.redux, ['loading']);
  
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public redux: NgRedux<any>
  ) {
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  logout() {
    this.viewCtrl.dismiss().then(() => {
      AuthActions.logout();
    })
  }

}
