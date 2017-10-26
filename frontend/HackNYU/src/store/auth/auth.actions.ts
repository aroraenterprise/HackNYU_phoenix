import { dispatch } from "@angular-redux/store";



export class AuthActions {

    @dispatch()
    static init = () => ({
        type: 'AuthInit'
    })

    @dispatch()
    static login = () => ({
        type: 'AuthLogin'
    })

    static loginComplete = () => ({
        type: 'AuthLoginComplete'
    })
}