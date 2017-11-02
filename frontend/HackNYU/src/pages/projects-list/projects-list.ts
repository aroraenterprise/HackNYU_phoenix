import { ProjectActions } from '../../store/project/project.actions';
import { getProjects } from '../../store/selectors/project.selectors';
import { NgRedux } from '@angular-redux/store';
import { ProjectAddPage } from '../project-add/project-add';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { ProjectViewPage } from '../project-view/project-view';


@IonicPage()
@Component({
  selector: 'page-projects-list',
  templateUrl: 'projects-list.html',
})
export class ProjectsListPage {

  projects$ = getProjects(this.redux, ['list']);

  projects = [
    {
      name: 'Voice[H]over',
      short: 'VOICE[H]OVER is open sourced assistive tech, created to aid people who are unable to move or speak talk.',
      featuredImage: {
        url: 'https://static1.squarespace.com/static/575b7e4b27d4bd874f36c608/5914471246c3c457b1a5809e/5914475aa5790aa528253925/1494501287442/Screen+Shot+2017-05-11+at+7.08.13+PM.png?format=750w'
      }
    }
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public redux: NgRedux<any>
  ) {
  }

  ionViewDidLoad() {
    // this.viewProject();
    // this.addProject();
    ProjectActions.list()
  }

  viewProject(){
    this.navCtrl.push(ProjectViewPage);
  }

  addProject(){
    this.modalCtrl.create(ProjectAddPage).present();
  }

}
