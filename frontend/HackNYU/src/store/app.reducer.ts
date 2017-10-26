import { combineReducers } from 'redux';

import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';

export const appReducer = combineReducers<AppState>({
    auth: authReducer
})