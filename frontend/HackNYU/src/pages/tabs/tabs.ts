import { ProjectsListPage } from '../projects-list/projects-list';
import { ProfilePage } from '../profile/profile';
import { ProjectViewPage } from '../project-view/project-view';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  selectedIndex = 0;
  projects = ProjectsListPage;
  profile = ProfilePage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
