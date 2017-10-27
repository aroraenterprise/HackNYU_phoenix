import { Action } from 'redux';
import { dispatch } from "@angular-redux/store";


export const AuthActionTypes = {
    AuthWebInit: 'Auth_Web_Init'
}

export class AuthActions {

    @dispatch()
    static init = () => ({
        type: AuthActionTypes.AuthWebInit
    })

    @dispatch()
    static login = () => ({
        type: 'AuthLogin'
    })

    static loginComplete = () => ({
        type: 'AuthLoginComplete'
    })
}