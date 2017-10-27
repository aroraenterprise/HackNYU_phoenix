import { ReduxAction } from '../redux-action';
import { dispatch } from '@angular-redux/store';

import { Account } from '../../client-lib';


export const AuthActionTypes = {
    Init: 'Auth_Init',
    InitComplete: 'Auth_Init_Complete',
    Login: 'Auth_Login',
    LoginComplete: 'Auth_Login_Complete',
    Logout: 'Auth_Logout',
    LogoutComplete: 'Auth_Logout_Complete'
}

export class AuthActions {

    @dispatch()
    static init = () => ({
        type: AuthActionTypes.Init
    })

    static initComplete = (account?: Account) => ({
        type: AuthActionTypes.InitComplete,
        payload: account
    })

    @dispatch()
    static login = () => ({
        type: AuthActionTypes.Login
    })

    static loginComplete = (account?: Account, err?: any): ReduxAction => ({
        type: AuthActionTypes.LoginComplete,
        payload: account,
        error: err,
        hasError: err != null
    })

    @dispatch()
    static logout = (): ReduxAction => ({
        type: AuthActionTypes.Logout
    })

    static logoutComplete = (err?: any): ReduxAction => ({
        type: AuthActionTypes.LogoutComplete,
        error: err,
        hasError: err != null        
    })
}