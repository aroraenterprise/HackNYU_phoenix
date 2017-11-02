import { Project } from '../../client-lib';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';

import { AppState } from '../app.state';


export function getProjects<T>(redux: NgRedux<AppState>, keys: string[] = []): Observable<T> {
    let store = ['projects'];
    keys.forEach(el=>store.push(el));
    return redux.select(store);
}

export function getProjectById(redux: NgRedux<AppState>, id: string): Observable<Project>{
    return redux.select(['projects', 'byId', id]);
}