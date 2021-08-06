const { REACT_APP_CLIENTS_PATH } = process.env;
const { REACT_APP_PROJECTS_PATH } = process.env;

export function getReadPath(type: string, page: number, limit: number, searchTerm: string) {
    let root = type === 'clients' ? CLIENTS_PATH : PROJECTS_PATH;
    let path = root + '?page=' + page + '&limit=' + limit;
    path += searchTerm ? '&term=' + searchTerm.trim() : '';
    return path;
}