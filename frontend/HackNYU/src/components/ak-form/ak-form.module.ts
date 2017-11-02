import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AkFormErrorComponent } from './ak-form-error/ak-form-error';
import { AkFormLengthComponent } from './ak-form-length/ak-form-length';

@NgModule({
	declarations: [
		AkFormErrorComponent, 
		AkFormLengthComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		AkFormErrorComponent,
		AkFormLengthComponent
	]
})
export class AkFormModule {}
