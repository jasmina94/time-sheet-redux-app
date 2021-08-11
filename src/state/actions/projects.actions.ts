import { searchService} from '../../services/search.service';
import { projectsService } from '../../services/projects.service';
import { FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE } from './types';

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
                console.log(err);
                dispatch({
                    type: FETCH_PROJECTS_FAILURE,
                    payload: { err }
                })
            })
    }, 1000);
}