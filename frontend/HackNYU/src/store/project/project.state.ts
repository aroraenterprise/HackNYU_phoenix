export interface ProjectState {
    currentProject?: {
        id: number,
        loading?: boolean
    },
    byId?: {[key: number]: {}},
    list?: number[];
}