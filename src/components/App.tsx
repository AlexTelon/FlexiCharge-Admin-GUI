/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import { Switch, useLocation, Route, Redirect } from 'react-router-dom';
import './App.css';
import { DashboardRoute } from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import { authenticationProvider } from '@/remote-access';
import axios from 'axios';

function App(): JSX.Element {
  const location = useLocation();
  /* const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticationProvider.isAuthenticated); */


  return (
    <>
      <Switch location={location}>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/login" component={Login} />
        <DashboardRoute path="/dashboard" />
      </Switch>
    </>
  );
}

export default App;