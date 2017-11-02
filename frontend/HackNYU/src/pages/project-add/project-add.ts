import { ProjectActions } from '../../store/project/project.actions';
import { Validators } from '@angular/forms';
import { AkFormControl } from '../../components/ak-form/models/ak-form-control';
import { AkFormGroup } from '../../components/ak-form/models/ak-form-group';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-project-add',
  templateUrl: 'project-add.html',
})
export class ProjectAddPage {

  form: AkFormGroup;

  constructor(
    public viewCtrl: ViewController, 
    public navParams: NavParams
  ) {
    this.createForm();
    this.form.patchValue({
      name: 'Test Project',
      short: 'hello world'
    })
  }

  ionViewDidLoad() {
    
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  save(){
    // this.viewCtrl.dismiss();
    if (!this.form.valid) {
      this.form.setShowError(true);
      return;
    }
    ProjectActions.create(this.form.value);
    this.dismiss();
  }

  private createForm(){
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
