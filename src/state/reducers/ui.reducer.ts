import { CLEAR_MESSAGE, FAILURE_MESSAGE, INFO_MESSAGE, SUCCESS_MESSAGE } from '../actions/types';
import { UIState } from '../state.model';

export const initState: UIState = {
    openSuccess: false,
    openFailure: false,
    openInfo: false,
    successMessage: '',
    failureMessage: '',
    infoMessage: ''
}

export default function uiReducer(state = initState, action: any) {
    switch (action.type) {
        case SUCCESS_MESSAGE:
            return {
                ...state,
                openSuccess: true,
                successMessage: action.payload.message
            }
        case FAILURE_MESSAGE:
            return {
                ...state,
                openFailure: true,
                failureMessage: action.payload.message
            }
        case INFO_MESSAGE:
            return {
                ...state,
                openInfo: true,
                infoMessage: action.payload.message
            }
        case CLEAR_MESSAGE:
            return {
                openSuccess: false,
                openFailure: false,
                openInfo: false,
                successMessage: '',
                failureMessage: '',
                infoMessage: ''
            }
        default:
            return state;
    }
}