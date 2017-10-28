import { AbstractControl } from '@angular/forms';

export interface AkControl extends AbstractControl {
    error(): string[] | boolean;

    setShowError(val: boolean);
}