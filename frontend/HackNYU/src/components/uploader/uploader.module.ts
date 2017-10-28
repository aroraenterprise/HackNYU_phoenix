import { ApiModule } from '../../client-lib';
import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { IonicModule } from 'ionic-angular';

import { PhotoUploaderComponent } from './photo-uploader/photo-uploader';
import { Uploader } from './uploader';

@NgModule({
	declarations: [
		PhotoUploaderComponent
	],
	imports: [
		IonicModule
	],
	providers: [
		Camera,
		FileTransfer,
		File,
		Uploader
	],
	exports: [
		PhotoUploaderComponent
	]
})
export class UploaderModule { }
