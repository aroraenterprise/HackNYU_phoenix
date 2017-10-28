import { Account } from '../../client-lib';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../app.state';
import { NgRedux } from '@angular-redux/store';


export function getAuth<T>(redux: NgRedux<AppState>, keys: string[] = []): Observable<T> {
    let store = ['auth'];
    keys.forEach(el=>store.push(el));
    return redux.select(store);
}

export function getAccount(redux: NgRedux<AppState>): Observable<Account> {
    return redux.select(['auth', 'account']);
}