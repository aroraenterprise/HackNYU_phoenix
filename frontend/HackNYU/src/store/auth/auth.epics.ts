import { Account, AccountService } from '../../client-lib';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import Auth0Cordova from '@auth0/cordova';
import { Storage } from '@ionic/storage';
import Auth0 from 'auth0-js';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { Observable, Subscriber } from 'rxjs/Rx';

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
        private storage: Storage,
        private accountSvc: AccountService
    ) {
        this.auth0 = new Auth0.WebAuth(this.auth0Config);
    }

    build() {
        return [
            createEpicMiddleware(this.initEpic()),
            createEpicMiddleware(this.loginEpic()),
            createEpicMiddleware(this.logoutEpic())
        ]
    }

    private initEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType(AuthActionTypes.Init)
            .switchMap(action => {
                if (this.platform.is('cordova')) {
                    //handles redirect for Auth0
                    (<any>window).handleOpenURL = (url) => {
                        Auth0Cordova.onRedirectUri(url);
                    };
                }

                return new Observable<Account>(o => {
                    //first see if there is local storage with the token
                    this.getToken()
                        .then(token => {
                            if (token) {
                                this.fetchAccount(token, o);
                            } else {
                                // no token found...if its not cordova check to make sure that there isn't a token
                                // in hash
                                if (!this.platform.is('cordova')) {
                                    this.auth0.parseHash((err, authResult) => {
                                        if (err) {
                                            o.error(err);
                                        } else if (authResult && authResult.idToken) {
                                            this.saveToken(authResult);
                                            this.fetchAccount(authResult.idToken, o);
                                        } else {
                                            o.next(null);
                                        }
                                    })
                                }
                            }
                        }, err => o.error(err));
                })
                    .map(account => AuthActions.initComplete(account))
                    .catch(err => of(AuthActions.initComplete()));
            });

    }

    private loginEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType(AuthActionTypes.Login)
            .switchMap((action: ReduxAction) => {
                const client = new Auth0Cordova(this.auth0Config);
                const options = {
                    scope: 'openid email'
                };
                return new Observable(o => {
                    if (this.platform.is('cordova')) {
                        client.authorize(options, (err, authResult) => {
                            if (err) {
                                o.error(err);
                            } else {
                                this.saveToken(authResult);
                                this.fetchAccount(authResult.idToken, o);
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

    private logoutEpic(): Epic<ReduxAction, AppState> {
        return (action$, store) => action$
            .ofType(AuthActionTypes.Logout)
            .switchMap((action: ReduxAction) => {
                this.storage.set(this.KeyExpiry, null);
                return Observable.fromPromise(
                    this.storage.set(this.KeyIdToken, null)
                )
                    .map(() => AuthActions.logoutComplete())
                    .catch(err => of(AuthActions.logoutComplete(err)))
            })
    }

    private fetchAccount(token, subscriber: Subscriber<Account>){
        this.accountSvc.configuration.apiKeys = { 'X-API-KEY': 'Bearer ' + token };
        this.accountSvc.authenticate()
            .subscribe(account => {
                subscriber.next(account);
            }, err => subscriber.error(err))
    }

    private saveToken({ expiresIn, idToken }) {
        const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        this.storage.set(this.KeyExpiry, expiresAt);
        this.storage.set(this.KeyIdToken, idToken);
    }

    private getToken() {
        return new Promise((resolve, reject) => {
            this.storage.get(this.KeyExpiry)
                .then(expiresAt => {
                    if (new Date().getTime() < JSON.parse(expiresAt))
                        this.storage.get(this.KeyIdToken).then(token => {
                            resolve(token);
                        }, err => {
                            reject(err);
                        });
                    else {
                        resolve(false);
                    }
                }, err => reject(err))
        });
    }
}