import { ReduxAction } from '../redux-action';
import { Project } from '../../client-lib';
import { dispatch } from '@angular-redux/store/lib/src/decorators/dispatch';

export const ProjectActionTypes = {
    Create: 'Project_Create',
    CreateComplete: 'Project_Create_Complete',
    List: 'Project_List',
    ListComplete: 'Project_List_Complete'
}

export class ProjectActions {

    @dispatch()
    static create = ({ name, short }): ReduxAction => ({
        type: ProjectActionTypes.Create,
        payload: {
            name: name,
            short: short
        }
    })

    static createComplete = (project?: Project, err?: any): ReduxAction => ({
        type: ProjectActionTypes.CreateComplete,
        payload: project,
        error: err,
        hasError: err != null
    })

    @dispatch()
    static list = (next?: boolean): ReduxAction => ({
        type: ProjectActionTypes.List,
        meta: { next: next }
    })

    static listComplete = ({data, meta}, err?: any): ReduxAction => ({
        type: ProjectActionTypes.ListComplete,
        payload: data,
        meta: meta,
        error: err,
        hasError: err != null
    })
}