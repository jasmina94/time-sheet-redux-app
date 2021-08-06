
const App = (props: any) => {
  return (
    <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={() => <HomePage userInfo={userInfo} />} />
                <Route path="/login" component={LoginPage} />
                <Route path="/forgotPassword" component={ForgotPasswordPage} />
            </Switch>
        </Router>
  )
}