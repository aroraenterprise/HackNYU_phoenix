import { ProjectState } from './project/project.state';
import { NavState } from './nav/nav.state';
import { AuthState } from './auth/auth.state';

export interface AppState {
    auth?: AuthState,
    nav?: NavState,
    projects?: ProjectState
}