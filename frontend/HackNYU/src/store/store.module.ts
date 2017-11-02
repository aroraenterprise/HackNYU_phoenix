import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { createLogger } from 'redux-logger';

import { ApiModule, BASE_PATH } from '../client-lib';
import { environment } from '../environments/environment';
import { AppEpics } from './app.epics';
import { appReducer } from './app.reducer';
import { AppState } from './app.state';
import { AuthEpics } from './auth/auth.epics';
import { ConfigFactory } from './config-factory';
import { ProjectEpics } from './project/project.epics';


const Providers = [
    {
        provide: BASE_PATH,
        useValue: environment.backendUrl
    },
    AppEpics,
    AuthEpics,
    ProjectEpics
]

@NgModule({
    imports: [
        HttpModule,
        NgReduxModule,
        ApiModule.forConfig(ConfigFactory),
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