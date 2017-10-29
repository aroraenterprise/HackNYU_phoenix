import { ReduxAction } from '../redux-action';
import { dispatch } from '@angular-redux/store';

export const NavActionTypes = {
    ToggleTabsShow: 'Nav_Toggle_Tabs_Shown'
}

export class NavActions {

    @dispatch()
    static toggleTabsShown = (show: boolean): ReduxAction => ({
        type: NavActionTypes.ToggleTabsShow,
        payload: show
    })
}