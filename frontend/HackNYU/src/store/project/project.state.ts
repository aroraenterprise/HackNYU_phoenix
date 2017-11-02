import { PaginationState } from '../pagination/pagination.state';
export interface ProjectState {
    currentProject?: {
        id: number,
        loading?: boolean
    },
    byId?: {[key: number]: {}},
    list?: PaginationState
}