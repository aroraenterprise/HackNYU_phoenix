import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PhotoUploaderComponent } from './photo-uploader/photo-uploader';
import { Camera } from '@ionic-native/camera';

@NgModule({
	declarations: [
		PhotoUploaderComponent
	],
	imports: [
		IonicModule
	],
	providers: [
		Camera
	],
	exports: [
		PhotoUploaderComponent
	]
})
export class UploaderModule { }
