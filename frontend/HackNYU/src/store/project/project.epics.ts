import { actionIsForCorrectPaginationType, fetchPage, pageNotAlreadyFetchedFilter } from '../pagination/pagination-helper';
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
            createEpicMiddleware(this.listEpic()),
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

    private listEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType(ProjectActionTypes.List)
            .switchMap(action => {
                const state = store.getState().projects.list;
                if (pageNotAlreadyFetchedFilter(state, action)) {
                    let cursor = action.meta.cursor;
                    if (!cursor && action.meta.next) {
                        cursor = state.meta.next;
                    }
                    const limit = action.meta.limit;
                    return this.projectSvc.list(cursor, limit)
                        .map(data => ProjectActions.listComplete({data: data, meta: action.meta}))
                        .catch(err => of(ProjectActions.listComplete({data: null, meta: action.meta}, err)))
                } else {
                    action.meta.alreadyFetched = true;
                    return of(ProjectActions.listComplete({data: {}, meta: action.meta}));
                }
            });
    }
}