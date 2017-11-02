import { SectionHeaders } from './section-headers';
import { TextEditorPage } from '../text-editor/text-editor';
import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-project-view',
  templateUrl: 'project-view.html',
})
export class ProjectViewPage {
  slidesOpt = {
    autoplay: 5000,
    loop: true
  }
  readonly Tabs = {
    Story: 'story',
    Team: 'team'
  }
  selectedTab = this.Tabs.Story;
  editMode: boolean = true;

  content = [

  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    // this.addText();

  }

  toggleEditMode(val: boolean) {
    this.editMode = val;
  }

  addText() {
    this.textHelper();
  }

  addPhoto() {

  }

  addVideo() {

  }

  openTextEditorModal(title?: string) {
    const modal = this.modalCtrl.create(
      TextEditorPage,
      { text: title ? `# ${title}\n\n` : '' }
    );
    modal.onDidDismiss(data => {
      if (data)
        this.content.push({ text: data.text })
    })
    modal.present()
  }

  textHelper() {
    let alert = this.alertCtrl.create({
      title: 'Section Helper',
      message: 'Pick a section header below to get started.',
      inputs: SectionHeaders.map(el => {
        return {
          type: 'radio',
          label: el,
          value: el
        }
      }),
      buttons: [
        {
          text: 'Custom Section',
          handler: () => {
            this.openTextEditorModal();
          }
        },
        {
          text: 'Select',
          handler: (data) => {
            this.openTextEditorModal(data);
          }
        }
      ]
    }).present();
  }
}
