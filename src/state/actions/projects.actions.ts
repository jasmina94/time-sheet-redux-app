import { searchService } from '../../services/search.service';
import { clientsService } from '../../services/clients.service';
import { projectsService } from '../../services/projects.service';
import { selectOptionService } from '../../services/select.options.service';

import {
    FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS,
    FAILURE_MESSAGE, SUCCESS_MESSAGE,
    CREATE_PROJECT, CREATE_PROJECT_SUCCESS,
    UPDATE_PROJECT, UPDATE_PROJECT_SUCCESS,
    DELETE_PROJECT,
    FETCH_CUSTOMERS,
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_LEADERS,
    FETCH_LEADERS_SUCCESS
} from './types';
import { Project } from '../../model/model';
import { authService } from '../../services/authentication.service';
import { userService } from '../../services/users.service';

export const fetchProjects = (page: number, perPage: number, term: string = '', letter: string = '') => (dispatch: any) => {
    dispatch({
        type: FETCH_PROJECTS,
        payload: {
            requestedPage: page,
            requestedSearchTerm: term,
            requestedDataPerPage: perPage
        }
    });

    setTimeout(() => {
        let action = null;
        if (letter === '') {
            action = projectsService.readBy(page, perPage, term);
        } else {
            action = searchService.searchByLetter(page, perPage, 'projects', letter);
        }

        action
            .then(res => dispatch({
                type: FETCH_PROJECTS_SUCCESS,
                payload: {
                    total: res.total,
                    projects: res.data,
                    numOfPages: res.numOfPages
                }
            }))
            .catch(err => {
                dispatch({
                    type: FAILURE_MESSAGE,
                    payload: { message: err }
                });
            })
    }, 1000);
};

export const createProject = (project: Project, refreshCallback: any) => (dispatch: any) => {
    dispatch({
        type: CREATE_PROJECT,
        payload: { newProject: project }
    });
    setTimeout(() => {
        projectsService.create(project)
            .then(res => {
                dispatch({
                    type: CREATE_PROJECT_SUCCESS,
                    payload: { project: res.data }
                });
                dispatch({
                    type: SUCCESS_MESSAGE,
                    payload: { message: `Successfully created new project ${res.data.name}.` }
                });
                refreshCallback();
            })
            .catch(err => {
                dispatch({
                    type: FAILURE_MESSAGE,
                    payload: { message: err }
                });
            })
    }, 2000)
};

export const updateProject = (project: Project, refreshCallback: any) => (dispatch: any) => {
    dispatch({ type: UPDATE_PROJECT });
    projectsService.update(project)
        .then(res => {
            dispatch({
                type: UPDATE_PROJECT_SUCCESS,
                payload: {
                    client: res.data
                }
            });
            dispatch({
                type: SUCCESS_MESSAGE,
                payload: { message: `Successfully updated project with id: ${project.id}` }
            });
            refreshCallback();
        })
        .catch(err => {
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            })
        });
};

export const deleteProject = (id: number) => (dispatch: any) => {
    dispatch({ type: DELETE_PROJECT, payload: { clientId: id } });
    projectsService.remove(id)
        .then(res => {
            dispatch({
                type: SUCCESS_MESSAGE,
                payload: { message: `Deleted project with id: ${id}.` }
            });
        })
        .catch(err => {
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            })
        });
};

export const fetchCustomers = () => (dispatch: any) => {
    dispatch({ type: FETCH_CUSTOMERS, payload: {} });
    clientsService.read()
        .then(res => {
            dispatch({
                type: FETCH_CUSTOMERS_SUCCESS,
                payload: { customerOptions: selectOptionService.getClients(res) }
            });
        })
        .catch(err => {
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            });
        })
};

export const fetchLeads = () => (dispatch: any) => {
    dispatch({ type: FETCH_LEADERS, payload: {} });
    userService.getAll()
        .then(res => {
            dispatch({
                type: FETCH_LEADERS_SUCCESS,
                payload: { leadersOptions: selectOptionService.getLeads(res) }
            })
        })
}