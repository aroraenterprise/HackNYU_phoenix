import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';

import { AccountService, ProjectsService } from '../../client-lib';
import { AppState } from '../app.state';
import { ReduxAction } from '../redux-action';
import { ProjectActions, ProjectActionTypes } from './project.actions';

@Injectable()
export class ProjectEpics {

    constructor(
        private accountSvc: AccountService,
        private projectSvc: ProjectsService
    ) {

    }

    build() {
        return [
            createEpicMiddleware(this.createEpic()),
        ]
    }

    private createEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType(ProjectActionTypes.Create)
            .switchMap(action => {
                return this.projectSvc.create(action.payload)
                    .map(project => ProjectActions.createComplete(project))
                    .catch(err => of(ProjectActions.createComplete(null, err)));
            });
    }
}