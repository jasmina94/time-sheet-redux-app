import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const storage = JSON.parse(localStorage.getItem('persist:root'));
        if (storage == null) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        } else {
            const userState = JSON.parse(storage.userReducer);
            if (!userState.loggingIn && !userState.loggedIn) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }            
        }

        return <Component {...props} />
    }} />
)