import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { ProjectItemComponent } from './project-item/project-item';

@NgModule({
	declarations: [
		ProjectItemComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		ProjectItemComponent
	]
})
export class ProjectComponentsModule {}
