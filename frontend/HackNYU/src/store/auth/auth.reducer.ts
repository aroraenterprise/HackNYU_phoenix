import { AuthActionTypes } from './auth.actions';
import { ReduxAction } from '../redux-action';
import { AuthState } from './auth.state';

export function authReducer(state: AuthState = {}, a: ReduxAction): {} {
    switch (a.type) {
        case AuthActionTypes.Login:
        case AuthActionTypes.Logout:
        case AuthActionTypes.Init:
            return {
                ...state,
                loading: true
            }
        case AuthActionTypes.InitComplete:
        case AuthActionTypes.LoginComplete:
            return {
                account: a.payload,
                loading: false
            }
        case AuthActionTypes.LogoutComplete:
            return {
                account: null,
                loading: false
            }
    }
    return state;
}