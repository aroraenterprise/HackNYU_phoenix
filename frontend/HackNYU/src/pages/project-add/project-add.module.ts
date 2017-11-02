import { AkFormModule } from '../../components/ak-form/ak-form.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectAddPage } from './project-add';

@NgModule({
  declarations: [
    ProjectAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectAddPage),
    AkFormModule
  ],
})
export class ProjectAddPageModule {}
