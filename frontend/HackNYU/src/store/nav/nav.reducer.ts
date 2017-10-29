import { NavInitialState } from './nav-initial.state';
import { NavActionTypes } from './nav.actions';
import { ReduxAction } from '../redux-action';
import { NavState } from './nav.state';

export function navReducer(state: NavState = NavInitialState, a: ReduxAction): NavState {
    switch(a.type){
        case NavActionTypes.ToggleTabsShow:
        return {
            ...state,
            tabsPage: {
                tabsShown: a.payload
            }
        }
    }
    return {...state};
}