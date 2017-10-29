import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
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
    this.markdownText.patchValue(`Hello world`)
    this.markdownText.markAsDirty();
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
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
              this.forceLeave = true;
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
