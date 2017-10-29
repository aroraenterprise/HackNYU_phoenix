import { MarkdownHtmlModule } from '../../components/markdown-html/markdown-html.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AutoresizeTextareaModule } from '../../directives/autoresize-textarea';
import { TextEditorPage } from './text-editor';

@NgModule({
  declarations: [
    TextEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(TextEditorPage),
    AutoresizeTextareaModule,
    MarkdownHtmlModule
  ],
})
export class TextEditorPageModule {}
