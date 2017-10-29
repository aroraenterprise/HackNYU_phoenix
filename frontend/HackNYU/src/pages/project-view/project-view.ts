import { TextEditorPage } from '../text-editor/text-editor';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';



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
    {
      title: 'Inspiration',
      html: `<p>When it comes to Cerebral Palsy and other potential diseases that causes immobility and speech impediments, the options
      that are available to give someone voice are often expensive and out of reach for many. Because of this, people with
      this condition have often had to rely on head mounted lasers, a print out, and the assistance of others to speak their
      voice. We wanted to change this and provide a low cost option that would turn voice to vision- thus introducing VOICE[H]OVER.
      </p>
    `
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {

  }

  ionViewDidLoad() {
    // this.addText();
  }

  toggleEditMode(val: boolean) {
    this.editMode = val;
  }

  addText() {
    const modal = this.modalCtrl.create(TextEditorPage);
    modal.onDidDismiss(data=>{
      console.log(data);
    })
    modal.present()
  }

  addPhoto() {

  }

  addVideo() {

  }
}
