import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationProvider from '../../remote-access/mock/AuthenticationProvider';

const Dashboard = () => {
  return (
    <p>meep</p>
  );
};

export const DashboardRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={() => {
      return AuthenticationProvider.instance.isAuthenticated
        ? <Dashboard />
        : <Redirect to='/login' />;
    }} />
  );
};

export default Dashboard;