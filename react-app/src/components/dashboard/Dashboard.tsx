import React from 'react';
import { Helmet } from 'react-helmet';
import { Box } from '@material-ui/core';
import { Route, Redirect, Link } from 'react-router-dom';
import { authenticationProvider } from '../../remote-access';
import ChargerStations from '../charger-stations/ChargerStations';

const Dashboard = (props: any) => {
  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <Box sx={{ position: 'absolute' }}>
        <Link to="/dashboard/chargers">asd</Link>
      </Box>
      <Route path="/dashboard/chargers" render={() => (<ChargerStations />)} />

    </>
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