import { AuthEpics } from './auth/auth.epics';
import { Injectable } from '@angular/core';

@Injectable()
export class AppEpics {

    constructor(
        private authEpics: AuthEpics
    ) {}

    createEpics() {
        return [
            ...this.authEpics.build()
        ];
    }
}