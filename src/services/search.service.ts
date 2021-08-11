import { tokenHelper } from '../_helpers/tokenHelper';
import { getSearchPath } from '../_helpers/pathHelper';
import { handleResponse } from '../_helpers/responseHandler';

export const searchService = {
    searchByLetter
}

function searchByLetter(page:number, perPage: number, searchType: string, letter: string) {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    const path = getSearchPath(page, perPage, searchType, letter);

    return fetch(path, requestOptions)
        .then(handleResponse)
        .then(response => { return response });
}

