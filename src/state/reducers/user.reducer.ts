import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILURE, LOGOUT } from '../actions/types';
import { UserState } from '../state.model';
import { tokenHelper} from '../../_helpers/tokenHelper';

const initialState: UserState = {
    loggingIn: false,
    loggedIn: false,
    userInfo: {
        email: '',
        firstname: '',
        lastname: ''
    },
    ttl: 0
}

export default function userReducer(state = initialState, action: any) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state, 
                loggingIn: true
            }
        case LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                userInfo: {
                    email: action.payload.decodedToken.userInfo.email,
                    firstname: action.payload.decodedToken.userInfo.firstname,
                    lastname: action.payload.decodedToken.userInfo.lastname
                },
                ttl: action.payload.decodedToken.iat
            }
        case LOGIN_REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload.err,
                loggingIn: false,
                loggedIn: false,
                userInfo: {},
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}