import { UploaderModule } from '../../components/uploader/uploader.module';
import { AkFormModule } from '../../components/ak-form/ak-form.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSetupPage } from './account-setup';

@NgModule({
  declarations: [
    AccountSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountSetupPage),
    AkFormModule,
    UploaderModule
  ],
})
export class AccountSetupPageModule {}
