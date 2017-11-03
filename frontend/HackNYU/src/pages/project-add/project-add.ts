import { Subscription } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { AkFormControl } from '../../components/ak-form/models/ak-form-control';
import { AkFormGroup } from '../../components/ak-form/models/ak-form-group';
import { ProjectActions } from '../../store/project/project.actions';
import { getProjectCurrent } from '../../store/selectors/project.selectors';

@IonicPage()
@Component({
  selector: 'page-project-add',
  templateUrl: 'project-add.html',
})
export class ProjectAddPage {

  form: AkFormGroup;
  project$ = getProjectCurrent(this.redux);
  project: { id?: string, loading?: boolean, error?: any }
  sub: Subscription;
  saving: boolean;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public redux: NgRedux<any>
  ) {
    this.createForm();
    this.form.patchValue({
      name: 'Test Project',
      short: 'hello world'
    })
  }

  ionViewDidLoad() {
    if (!this.sub) {
      this.sub = this.project$.subscribe(data => {
        this.project = data;
        if (this.project) {
          if (this.saving && this.project.id) {
            this.dismiss({ id: data.id });
          } else if (this.project.error) {
            this.saving = false;
            console.log(data.error);
          }
        }
      })
    }
  }

  ionViewDidUnload() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  save() {
    if (!this.form.valid) {
      this.form.setShowError(true);
      return;
    }
    this.saving = true;
    ProjectActions.create(this.form.value);
  }

  private createForm() {
    this.form = new AkFormGroup({
      'name': new AkFormControl(null, [
        {
          key: 'required',
          message: 'Project name is required'
        }
      ], Validators.required),
      'short': new AkFormControl(null, [
        {
          key: 'required',
          message: 'A short description of the project is required'
        },
        {
          key: 'maxlength',
          message: 'A short description must be less than 120 characters'
        }
      ], [Validators.required, Validators.maxLength(120)])
    });
  }

}
