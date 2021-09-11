import React, { /* useState */ } from 'react';
import { Switch, useLocation, Route, Redirect } from 'react-router-dom';
import './App.css';
import { DashboardRoute } from './components/dashboard/Dashboard';
import Login from './components/login/Login';

function App(): JSX.Element {
  const location = useLocation();
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthenticationProvider.instance.isAuthenticated);
  return (
    <Switch location={location}>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      <Route path="/login" component={Login} />
      <DashboardRoute path="/dashboard" />
    </Switch>
  );
}

export default App;