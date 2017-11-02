import { ProjectEpics } from './project/project.epics';
import { AuthEpics } from './auth/auth.epics';
import { Injectable } from '@angular/core';

@Injectable()
export class AppEpics {

    constructor(
        private authEpics: AuthEpics,
        private projectEpics: ProjectEpics
    ) {}

    createEpics() {
        return [
            ...this.authEpics.build(),
            ...this.projectEpics.build()
        ];
    }
}