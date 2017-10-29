import { NgReduxModule } from '@angular-redux/store';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AccountSetupPageModule } from '../pages/account-setup/account-setup.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ProjectViewPageModule } from '../pages/project-view/project-view.module';
import { ProjectsListPageModule } from '../pages/projects-list/projects-list.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { StoreModule } from '../store/store.module';
import { MyApp } from './app.component';

const Pages = [
  LoginPageModule,
  TabsPageModule,
  ProjectsListPageModule,
  ProjectViewPageModule,
  ProfilePageModule,
  SettingsPageModule,
  AccountSetupPageModule
]

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgReduxModule,
    StoreModule.forRoot(),
    ...Pages
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
