import { Route, Router, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/shared/PrivateRoute';


const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage}/>} />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgotPassword" component={ForgotPasswordPage} />
      </Switch>
    </Router>
  )
}