import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../_helpers/historyHelper';
import { PrivateRoute } from '../components/shared/PrivateRoute';
import { ForgotPasswordPage } from '../pages';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage}/>
        <Route path="/login" component={LoginPage}  />
        <Route path="/forgotPassword" component={ForgotPasswordPage} />
      </Switch>
    </Router>
  )
}

export { App };