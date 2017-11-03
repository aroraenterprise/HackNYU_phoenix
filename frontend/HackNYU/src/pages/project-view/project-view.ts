import { sanitizeData } from '../../util';
import { ProjectActions } from '../../store/project/project.actions';
import { environment } from '../../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { getProjectById } from '../../store/selectors/project.selectors';
import { Project, ProjectParam } from '../../client-lib';
import { Observable } from 'rxjs/Rx';
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
    loop: true,
    slides: []
  }

  readonly Tabs = {
    Story: 'story',
    Team: 'team'
  }
  selectedTab = this.Tabs.Story;
  editMode: boolean = true;
  projectId: string;
  project$: Observable<Project>;
  project: Project;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public redux: NgRedux<any>
  ) {
    this.projectId = navParams.data.projectId;
    this.project$ = getProjectById(this.redux, this.projectId);
    this.project$.subscribe(data => {
      this.project = data;
      if (this.project) {
        this.presentProject();
      }
    })
  }

  ionViewDidLoad() {

  }

  presentProject() {
    if (this.project.featuredImage && this.project.featuredImage.url) {
      this.slidesOpt.slides.push(this.project.featuredImage.url)
    }
    if (this.project.images) {
      this.project.images.forEach(image => {
        if (image.url) {
          this.slidesOpt.slides.push(image.url);
        }
      });
    }
    if (this.slidesOpt.slides.length == 0) {
      this.slidesOpt.loop = false;
      this.slidesOpt.slides.push('https://devpost-challengepost.netdna-ssl.com/assets/defaults/thumbnail-placeholder-42bcab8d8178b413922ae2877d8b0868.gif')
    }
  }

  toggleEditMode() {
    // this.editMode = !this.editMode;
    this.project.content = this.project.content || [];
    this.project.content.push({
      text: '# Inspiration \n ## This works'
    })
    ProjectActions.update(sanitizeData(this.project));
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
