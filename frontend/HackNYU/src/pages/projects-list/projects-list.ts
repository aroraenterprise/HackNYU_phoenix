import { PaginationState } from '../../store/pagination/pagination.state';
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

  projects$ = getProjects<PaginationState>(this.redux, ['list']);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public redux: NgRedux<any>
  ) {
  }

  ionViewDidLoad() {
    this.projects$.subscribe(data => {
      if (data && data.itemIds) {
        this.viewProject({ id: data.itemIds[0].toString() });
      }
    })
    ProjectActions.list()
  }

  viewProject({ id }) {
    this.navCtrl.push(ProjectViewPage, { projectId: id });
  }

  addProject() {
    let modal = this.modalCtrl.create(ProjectAddPage);
    modal.onDidDismiss(data => {
      if (data && data.id) {
        this.navCtrl.push(ProjectViewPage, { projectId: data.id })
      }
    })
    modal.present();
  }

}
