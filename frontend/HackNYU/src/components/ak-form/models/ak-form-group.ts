import { AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

import { AkControl } from './ak-control.interface';

export class AkFormGroup extends FormGroup implements AkControl{
    showError: boolean = false;
    
    get(controlName: string){
        return <AkControl>super.get(controlName);
    }

    error(): string[] | boolean {
        return false;
    }

    setShowError(val: boolean){
        for (const key in this.controls)
            this.get(key).setShowError(val);
        this.showError = val;
    }

    constructor(controls: {
        [key: string]: AkControl;
    }, validator?: ValidatorFn | null, asyncValidator?: AsyncValidatorFn | null) {
        super(controls, validator, asyncValidator);
    }
}