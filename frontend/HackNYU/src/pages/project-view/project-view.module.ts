import { MarkdownHtmlModule } from '../../components/markdown-html/markdown-html.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectViewPage } from './project-view';

@NgModule({
  declarations: [
    ProjectViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectViewPage),
    MarkdownHtmlModule
  ],
})
export class ProjectViewPageModule {}
