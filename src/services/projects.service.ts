import { Project } from '../model/model';
import { tokenHelper } from '../_helpers/tokenHelper';
import { handleResponse } from '../_helpers/responseHandler';
import { PROJECTS_PATH, getReadPath } from '../_helpers/pathHelper';

export const projectsService = {
    create,
    read,
    readBy,
    update,
    remove
}

function create(project: Project) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: project.name, description: project.description,
            status: project.status, customer: project.customer, lead: project.lead
        })
    };
    return fetch(PROJECTS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => {
            return { success: true, data: response.data, error: '' };
        });
}

function read() {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    return fetch(PROJECTS_PATH + '/all', requestOptions)
        .then(handleResponse)
        .then(response => { return response.data });
}

function readBy(page: number, perPage: number, term: string) {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    const path = getReadPath('projects', page, perPage, term);
    return fetch(path, requestOptions)
        .then(handleResponse)
        .then(response => { return response });
}

function update(project: Project) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: project.id, name: project.name, description: project.description,
            status: project.status, customer: project.customer, lead: project.lead
        })
    };
    return fetch(PROJECTS_PATH + '/' + project.id, requestOptions)
        .then(handleResponse)
        .then(response => { return response.data });
}

function remove(projectId: number) {
    let requestOptions: any = { method: 'DELETE', headers: tokenHelper.getAuthHeader() };
    return fetch(PROJECTS_PATH + '/' + projectId, requestOptions)
        .then(handleResponse)
        .then(response => { return response; })
        .catch(error => { return { success: false, data: {}, error: error }; })
}