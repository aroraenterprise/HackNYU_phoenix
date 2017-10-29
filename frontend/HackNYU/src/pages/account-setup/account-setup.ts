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
    this.form.patchValue({
      picture: {"contentType":"image/jpeg","mediaType":"photo","data":{"alt":"Profile picture"},"filename":"profile_pic.jpeg","url":"https://storage.googleapis.com/hacknyu-phoenix-dev1/content/5629499534213120/image/jpeg/39ff7a733392f3d1093ddb79132b6442a4dbcd0086fe0517a4c08853/profile_pic.jpeg?Signature=HAjiVlEVMA%2BLmonZTG3Nrfe7ODlAwHsGJ1wm1pRk5HSmG6%2BsIMrwXgjmK5G6LR7uOMJelcsYCzhexGEmOM1DV04YLjYp30bIDTgbRs1R34EH%2FxcePsVt9UssOQmpgL22XLf%2BC22dgPAGwm9jrJnBQF111uNI1yKw9yLn%2ButKCpIx0KDkYdZOellHK3LHrwMAOaw%2FmLTZBcvF2Wz5P27LuO%2Bo5Fpf6r3I0CV467ZM3QAp72mZZDdSuUE1jj08Jd305S16fXWeShGjvWIavkdv6D%2BfXyVh%2Bs3hbx1SMbbT5f6c3BMJc3DhGP8ZamF4hmwgpEj4cCwLBtV0MTNrn2ffgQ%3D%3D&Expires=1509406735&GoogleAccessId=storage-appengine%40hacknyu-phoenix-dev.iam.gserviceaccount.com","isPublic":false,"id":5770237022568448}
    })
    this.form.get('picture').valueChanges.subscribe(data=>{
      console.log(data);
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
