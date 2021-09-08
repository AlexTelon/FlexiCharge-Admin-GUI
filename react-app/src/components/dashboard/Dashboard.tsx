import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationProvider } from '../../remote-access';

const Dashboard = () => {
  return (
    <p>meep</p>
  );
};

export const DashboardRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={() => {
      return authenticationProvider.isAuthenticated
        ? <Dashboard />
        : <Redirect to='/login' />;
    }} />
  );
};

export default Dashboard;