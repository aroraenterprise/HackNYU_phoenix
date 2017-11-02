import { projectsReducer } from './project/project.reducer';
import { navReducer } from './nav/nav.reducer';
import { combineReducers } from 'redux';

import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';

export const appReducer = combineReducers<AppState>({
    auth: authReducer,
    nav: navReducer,
    projects: projectsReducer
})