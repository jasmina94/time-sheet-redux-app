import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../_helpers/historyHelper';
import { PrivateRoute } from '../components/shared/PrivateRoute';
import { ForgotPasswordPage } from '../pages';
import AlertSnackbar from '../components/snackbar/AlertSnackbar';
import { LoginPage } from '../pages/loginPage';
import HomePage from '../pages/homePage';
import { ChangePasswordPage } from '../pages/changePasswordPage';

const App = () => {
  return (
    <>
      <AlertSnackbar />
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgotPassword" component={ForgotPasswordPage} />
          <Route path="/changePassword" component={ChangePasswordPage} />
        </Switch>
      </Router>
    </>
  )
}

export { App };