import { Observable } from 'rxjs/Rx';

import { ReduxAction } from '../redux-action';
import { PaginationState } from './pagination.state';


export interface PaginationMeta {
    listType?: string;
    cursor?: string;
    next?: boolean;
    limit?: number;
    alreadyFetched?: boolean;
    data?: any;
};

export const actionIsForCorrectPaginationType = (listType: string) => (action: ReduxAction): boolean => {
    return action.meta.listType === listType;
}

export function pageNotAlreadyFetchedFilter(state: PaginationState, action: ReduxAction) {
    let cursor = action.meta.cursor;
    if (!cursor && action.meta.next) {
        cursor = state.meta.next;
    }
    if (!state.initialized)
        return true;

    if ((!state.meta || state.meta.more) &&
        (!state.fetchedCursors || state.fetchedCursors.indexOf(cursor) == -1)) {
        return true;
    }
    return false;
}


export function fetchPage(
    state: PaginationState,
    action: ReduxAction,
    svc: (cursor?: string, limit?: number) => Observable<any>) {
    let cursor = action.meta.cursor;
    if (!cursor && action.meta.next) {
        cursor = state.meta.next;
    }
    const limit = action.meta.limit;
    return svc(cursor, limit);
}