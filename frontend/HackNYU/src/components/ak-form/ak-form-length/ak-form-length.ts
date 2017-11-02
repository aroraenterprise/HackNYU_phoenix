import { Component, Input } from '@angular/core';

import { AkFormGroup } from '../models/ak-form-group';

@Component({
  selector: 'ak-form-length',
  templateUrl: 'ak-form-length.html'
})
export class AkFormLengthComponent {

  @Input('form') public form: AkFormGroup;
  @Input('control') public controlName: string;
  @Input('maxLength') public maxLength: number;

  get length() {
    const value = this.form.get(this.controlName).value
    return value ? value.length : 0
  }

  get error(){
    return this.length > this.maxLength;
  }

  constructor() {
  }

}
