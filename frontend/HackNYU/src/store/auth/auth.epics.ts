import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import Auth0Cordova from '@auth0/cordova';
import { Storage } from '@ionic/storage';
import Auth0 from 'auth0-js';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { AppState } from '../app.state';
import { ReduxAction } from '../redux-action';
import { AuthActions, AuthActionTypes } from './auth.actions';

@Injectable()
export class AuthEpics {

    readonly auth0Config = {
        // needed for auth0
        clientID: environment.auth0.clientID,
        responseType: 'token id_token',
        audience: environment.auth0.audience,
        redirectUri: location.href,

        // needed for auth0cordova
        clientId: environment.auth0.clientID,
        domain: environment.auth0.domain,
        callbackURL: location.href,
        packageIdentifier: environment.auth0.packageIdentifier
    };
    auth0: Auth0.WebAuth;
    readonly KeyExpiry = 'auth.expiry';
    readonly KeyIdToken = 'auth.idToken';


    constructor(
        private platform: Platform,
        private storage: Storage
    ) {
        this.auth0 = new Auth0.WebAuth(this.auth0Config);
    }

    build() {
        return [
            createEpicMiddleware(this.webInitEpic()),
            createEpicMiddleware(this.loginEpic())
        ]
    }

    private webInitEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType(AuthActionTypes.AuthWebInit)
            .switchMap(action => {
                return new Observable(o => {
                    this.auth0.parseHash((err, authResult) => {
                        if (err) {
                            o.error(err);
                        } else if (authResult && authResult.idToken) {
                            this.saveToken(authResult);
                        } else {
                            o.next(null);
                        }
                    })
                })
                    .map(user => AuthActions.loginComplete())
                    .catch(err => of(AuthActions.loginComplete()));
            });

    }

    private loginEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType('AuthLogin')
            .switchMap((action: ReduxAction) => {
                const client = new Auth0Cordova(this.auth0Config);
                const options = {
                    scope: 'openid email profile offline_access'
                };
                return new Observable(o => {
                    if (this.platform.is('cordova')) {
                        client.authorize(options, (err, authResult) => {
                            if (err) {
                                o.error(err);
                            } else {
                                this.saveToken(authResult);
                                //send id token to backend
                            }
                        });
                    } else {
                        this.auth0.authorize()
                    }
                })
                    .map(user => AuthActions.loginComplete())
                    .catch(err => of(AuthActions.loginComplete()))
            })
    }

    private saveToken({ expiresIn, idToken }) {
        const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        this.storage.set(this.KeyExpiry, expiresAt);
        this.storage.set(this.KeyIdToken, idToken);
        console.log(idToken);
    }
}