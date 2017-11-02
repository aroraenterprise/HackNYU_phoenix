import { PaginationState } from '../pagination/pagination.state';
import { ProjectActionTypes } from './project.actions';
import { ReduxAction } from '../redux-action';
import { ProjectInitialState } from './project-initial.state';
import { ProjectState } from './project.state';

export function projectsReducer(state: ProjectState = ProjectInitialState, action: ReduxAction): ProjectState {
    switch (action.type) {
        case ProjectActionTypes.List:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true
                }
            }
        case ProjectActionTypes.ListComplete: {
            let currentList: PaginationState = Object.assign({}, state.list);
            if (action.error) {
                currentList.error = action.error;
            } else if (!action.meta.alreadyFetched) {
                currentList.itemIds = currentList.itemIds || [];
                if (action.payload.items) {
                    action.payload.items.forEach(newItem => {
                        state.byId[newItem.id] = newItem;
                        if (currentList.itemIds.findIndex((id: string) => {
                            return id == newItem.id.toString()
                        }) == -1)
                            currentList.itemIds.push(newItem.id);
                    })
                }
                currentList.meta = action.payload.meta
                currentList.fetchedCursors.push(action.meta.cursor)
            }
            return {
                ...state,
                list: {
                    ...currentList,
                    initialized: true,
                    loading: false
                }
            }
        }
        case ProjectActionTypes.CreateComplete: {
            let currentList = Object.assign({}, state.list);
            currentList.itemIds = currentList.itemIds || [];
            currentList.itemIds.splice(0, 0, action.payload.id);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                },
                list: currentList
            }
        }
    }
    return { ...state };
}