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

export default function userReducer(state: UserState = initialState, action: any) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state, 
                loggingIn: true
            }
        case LOGIN_REQUEST_SUCCESS:
            const decodedToken = tokenHelper.getUserInfo(action.payload.token);
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                userInfo: {
                    email: decodedToken.userInfo.email,
                    firstname: decodedToken.userInfo.firstname,
                    lastname: decodedToken.userInfo.lastname
                },
                ttl: decodedToken.iat
            }
        case LOGIN_REQUEST_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                userInfo: {}
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}