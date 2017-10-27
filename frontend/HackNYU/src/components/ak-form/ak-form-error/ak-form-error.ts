import { Component, Input } from '@angular/core';

import { AkFormGroup } from '../models/ak-form-group';

/**
 * Generated class for the AkFormErrorComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ak-form-error',
  templateUrl: 'ak-form-error.html'
})
export class AkFormErrorComponent {

  @Input('form') public form: AkFormGroup;
  @Input('control') public controlName: string;

  get controlError() { return this.form.get(this.controlName).error() }

  constructor() {
  }

}
