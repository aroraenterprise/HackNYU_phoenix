import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AkFormErrorComponent } from './ak-form-error/ak-form-error';

@NgModule({
	declarations: [AkFormErrorComponent],
	imports: [
		CommonModule
	],
	exports: [AkFormErrorComponent]
})
export class AkFormModule {}
