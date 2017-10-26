import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { createLogger } from 'redux-logger';

import { AppEpics } from './app.epics';
import { appReducer } from './app.reducer';
import { AppState } from './app.state';

const Providers = [
    AppEpics
]

@NgModule({
    imports: [
        HttpModule,
        NgReduxModule
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