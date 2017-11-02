import { PaginationInit } from '../pagination/pagination.state';
import { ProjectState } from './project.state';

export const ProjectInitialState: ProjectState = {
    byId: {},
    list: PaginationInit
}