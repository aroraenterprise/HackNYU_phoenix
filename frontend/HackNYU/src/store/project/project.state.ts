import { PaginationState } from '../pagination/pagination.state';
export interface ProjectState {
    current?: {
        id?: number,
        loading?: boolean,
        error?: any
    },
    byId?: {[key: number]: {}},
    list?: PaginationState
}