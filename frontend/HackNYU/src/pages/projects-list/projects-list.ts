import { ProjectViewPage } from '../project-view/project-view';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-projects-list',
  templateUrl: 'projects-list.html',
})
export class ProjectsListPage {

  projects = [
    {
      name: 'Voice[H]over',
      short: 'VOICE[H]OVER is open sourced assistive tech, created to aid people who are unable to move or speak talk.',
      featuredImage: {
        url: 'https://static1.squarespace.com/static/575b7e4b27d4bd874f36c608/5914471246c3c457b1a5809e/5914475aa5790aa528253925/1494501287442/Screen+Shot+2017-05-11+at+7.08.13+PM.png?format=750w'
      }
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  viewProject(){
    this.navCtrl.push(ProjectViewPage);
  }

}
