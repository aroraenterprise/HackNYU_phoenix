import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

import { AkControlError } from './ak-control-error';
import { AkControl } from './ak-control.interface';


export class AkFormControl extends FormControl implements AkControl {
    showError: boolean = false;

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
        this.showError = val;
    }

    constructor(formState?: any, public akErrors?: AkControlError[], validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(formState, validator, asyncValidator);
    }
}