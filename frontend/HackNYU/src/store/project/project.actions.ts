import { Project } from '../../client-lib';
import { dispatch } from '@angular-redux/store/lib/src/decorators/dispatch';

export const ProjectActionTypes = {
    Create: 'Project_Create',
    CreateComplete: 'Project_Create_Complete'
}

export class ProjectActions {

    @dispatch()
    static create = ({name, short}) => ({
        type: ProjectActionTypes.Create,
        payload: {
            name: name,
            short: short
        }
    })

    static createComplete = (project?: Project, err?: any) => ({
        type: ProjectActionTypes.CreateComplete,
        payload: project,
        error: err,
        hasError: err != null
    })
}