import { ReduxAction } from '../redux-action';
import { ProjectState } from './project.state';

export function projectReducer(state: ProjectState = {}, a: ReduxAction): ProjectState {
    switch(a.type){
        
    }
    return {...state};
}