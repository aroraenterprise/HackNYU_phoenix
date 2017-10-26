import { dispatch } from "@angular-redux/store";



export class AuthActions {
    @dispatch()
    static login = () => ({
        type: 'AuthLogin'
    })

    static loginComplete = () => ({
        type: 'AuthLoginComplete'
    })
}