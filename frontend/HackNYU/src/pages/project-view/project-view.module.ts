import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectViewPage } from './project-view';

@NgModule({
  declarations: [
    ProjectViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectViewPage),
  ],
})
export class ProjectViewPageModule {}
