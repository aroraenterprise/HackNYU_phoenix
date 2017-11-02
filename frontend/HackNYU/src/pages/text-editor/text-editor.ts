import { AutoresizeTextareaDirective } from '../../directives/autoresize-textarea/autoresize-textarea';
import { FormControl } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavParams, ViewController } from 'ionic-angular';
import marked from 'marked';

@IonicPage()
@Component({
  selector: 'page-text-editor',
  templateUrl: 'text-editor.html',
})
export class TextEditorPage {

  markdownText: FormControl;
  previewHtml: string;
  forceLeave: boolean = false;
  @ViewChild(AutoresizeTextareaDirective) autoresize;

  readonly Tabs = {
    Markdown: 'markdown',
    Preview: 'preview'
  }
  selectedTab = this.Tabs.Markdown;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.markdownText = new FormControl();
    this.markdownText.patchValue(navParams.data ? navParams.data.text : '');
  }

  ionViewDidLoad() {
    this.autoresize.adjust();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.forceLeave = true;
    this.viewCtrl.dismiss({ 
      text: this.markdownText.value 
    });
  }

  ionViewCanLeave() {
    if (!this.forceLeave && this.markdownText.dirty) {
      console.log('check before leaving');
      this.alertCtrl.create({
        title: 'Unsaved work',
        message: 'You have unsaved work. Would you like to save before leaving?',
        buttons: [
          {
            text: 'Discard',
            handler: () => {
              this.forceLeave = true;
              this.dismiss();
            }
          },
          {
            text: 'Save',
            handler: () => {
              this.save();
            }
          }
        ]
      }).present();
      return false;
    } else {
      return true;
    }
  }

}
