import { AbstractControl, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';

import { AkControlError } from './ak-control-error';
import { AkControl } from './ak-control.interface';

export class AkFormArray extends FormArray implements AkControl {
    showError: boolean = false;
    addFn: Function;

    error(): string[] | boolean {
        if (!this.valid && this.showError && this.enabled) {
            let errors = [];
            this.akErrors.forEach(error => {
                if (this.errors && this.errors.hasOwnProperty(error.key))
                    errors.push(error.message);
            })
            return errors;
        }
        return false;
    }

    setShowError(val: boolean) {
        this.controls.forEach((control: AkControl) => {
            control.setShowError(val);
        })
        this.showError = val;
    }

    constructor(controls: AbstractControl[], addFn: Function, public akErrors?: AkControlError[], validator?: ValidatorFn | null, asyncValidator?: AsyncValidatorFn | null) {
        super(controls, validator, asyncValidator)
        this.addFn = addFn;
        this.add();
    }

    patchValue(val: any[]) {
        this.controls = [];
        val.forEach(() => this.add());
        super.patchValue(val);
        if (this.controls.length == 0)
            this.add();
    }

    add() {
        this.push(this.addFn());
    }

    remove(index: number) {
        this.removeAt(index);
    }


}