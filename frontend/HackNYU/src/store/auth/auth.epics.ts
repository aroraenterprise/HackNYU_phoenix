import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthActions } from './auth.actions';
import { AppState } from '../app.state';
import { ReduxAction } from '../redux-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

@Injectable()
export class AuthEpics {

    readonly auth0Config = {
        // needed for auth0
        clientID: environment.auth0.clientID,

        // needed for auth0cordova
        clientId: environment.auth0.clientID,
        domain: environment.auth0.domain,
        callbackURL: location.href,
        packageIdentifier: environment.auth0.packageIdentifier
    };
    auth0: Auth0.WebAuth;

    constructor() {
        this.auth0 = new Auth0.WebAuth(this.auth0Config);
    }

    build() {
        return [
            createEpicMiddleware(this.loginEpic())
        ]
    }

    private loginEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType('AuthLogin')
            .switchMap((action: ReduxAction) => {
                const client = new Auth0Cordova(this.auth0Config);
                const options = {
                    scope: 'openid profile offline_access'
                };
                return new Observable(o => {
                    client.authorize(options, (err, authResult) => {
                        if (err) {
                            o.error(err);
                        } else {
                            this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
                                if (err) {
                                    o.error(err);
                                } else {
                                    profile.user_metadata = profile.user_metadata || {};
                                    console.log(profile);
                                }
                            });
                        }
                    });
                })
                    .map(user => AuthActions.loginComplete())
                    .catch(err => of(AuthActions.loginComplete()))
            })
    }
}