import { ProjectComponentsModule } from '../../components/projects/project-components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsListPage } from './projects-list';

@NgModule({
  declarations: [
    ProjectsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsListPage),
    ProjectComponentsModule
  ],
})
export class ProjectsListPageModule {}
