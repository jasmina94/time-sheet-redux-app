const { REACT_APP_USERS_PATH } = process.env;
const { REACT_APP_LOGIN_PATH } = process.env;
const { REACT_APP_SEARCH_PATH } = process.env;
const { REACT_APP_CLIENTS_PATH } = process.env;
const { REACT_APP_PROJECTS_PATH } = process.env;
const { REACT_APP_RESET_PASSWORD_PATH } = process.env;


export const USERS_PATH = REACT_APP_USERS_PATH ?? 'http://localhost:8000/users';
export const LOGIN_PATH = REACT_APP_LOGIN_PATH ?? 'http://localhost:8000/login';
export const SEARCH_PATH = REACT_APP_SEARCH_PATH ?? 'http://localhost:8000/search';
export const CLIENTS_PATH = REACT_APP_CLIENTS_PATH ?? 'http://localhost:8000/clients';
export const PROJECTS_PATH = REACT_APP_PROJECTS_PATH ?? 'http://localhost:8000/projects';
export const RESET_PASSWORD_PATH = REACT_APP_RESET_PASSWORD_PATH ?? 'http://localhost:8000/password';


export function getReadPath(type: string, page: number, limit: number, searchTerm: string) {
    let root = type === 'clients' ? CLIENTS_PATH : PROJECTS_PATH;
    let path = root + '?page=' + page + '&limit=' + limit;
    path += searchTerm ? '&term=' + searchTerm.trim() : '';
    return path;
}

export function getSearchPath(page: number, perPage: number, type: string, searchLetter: string) {
    let path = SEARCH_PATH + '/name/' + type + '?page=' + page + '&limit=' + perPage;
    path += '&beginsWith=' + searchLetter;
    return path;
}