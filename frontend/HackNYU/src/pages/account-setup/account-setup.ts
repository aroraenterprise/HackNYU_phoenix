import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';

import { AkFormControl } from '../../components/ak-form/models/ak-form-control';
import { AkFormGroup } from '../../components/ak-form/models/ak-form-group';
import { AuthActions } from '../../store/auth/auth.actions';
import { getAccount } from '../../store/selectors/auth.selectors';
import { sanitizeData } from '../../util';

@IonicPage()
@Component({
  selector: 'page-account-setup',
  templateUrl: 'account-setup.html',
})
export class AccountSetupPage {

  form: AkFormGroup;
  account$ = getAccount(this.redux);
  sub: Subscription;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public redux: NgRedux<any>
  ) {
    this.setupForm();
  }

  ionViewDidLoad() {
    this.sub = this.account$.subscribe((account)=>{
      if (account)
        this.form.patchValue(account);
    })
  }

  ionvViewDidUnload(){
    if (this.sub){
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  private setupForm(){
    this.form = new AkFormGroup({
      'name': new AkFormControl(null, [
        {
          key: 'required',
          message: 'Please enter your full name'
        }
      ], [Validators.required]),
      'email': new AkFormControl(null, [
        {
          key: 'email',
          message: 'Invalid email address'
        }
      ], [Validators.email]),
      'nickname': new AkFormControl(null, [], []),
      'picture': new AkFormControl({}, [], []),
    })
  }

  updateAccount(){
    if (!this.form.valid){
      this.form.setShowError(true);
      return;
    } else {
      AuthActions.update(sanitizeData(this.form.value));
    }
  }

}
