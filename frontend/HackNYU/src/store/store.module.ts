import { environment } from '../environments/environment';
import { ApiModule, BASE_PATH } from '../client-lib';
import { AuthEpics } from './auth/auth.epics';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { createLogger } from 'redux-logger';

import { AppEpics } from './app.epics';
import { appReducer } from './app.reducer';
import { AppState } from './app.state';

const Providers = [
    {
        provide: BASE_PATH,
        useValue: environment.backendUrl
    },
    AppEpics,
    AuthEpics
]

@NgModule({
    imports: [
        HttpModule,
        NgReduxModule,
        ApiModule,        
    ]
})
export class StoreModule {
    constructor(
        ngRedux: NgRedux<AppState>,
        devTools: DevToolsExtension,
        appEpics: AppEpics
    ) {
        ngRedux.configureStore(
            appReducer,
            {},
            [createLogger(), ...appEpics.createEpics()],
            devTools.isEnabled() ? [devTools.enhancer()] : []
        );
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: StoreModule,
            providers: Providers
        };
    }


}