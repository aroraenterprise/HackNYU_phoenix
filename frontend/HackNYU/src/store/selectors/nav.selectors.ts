import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';

import { AppState } from '../app.state';


export function getNav<T>(redux: NgRedux<AppState>, keys: string[] = []): Observable<T> {
    let store = ['nav'];
    keys.forEach(el=>store.push(el));
    return redux.select(store);
}