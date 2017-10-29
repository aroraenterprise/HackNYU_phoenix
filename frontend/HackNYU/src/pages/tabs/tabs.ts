import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { ProjectsListPage } from '../projects-list/projects-list';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  selectedIndex = 0;
  projects = ProjectsListPage;
  profile = ProfilePage;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
  }

}
