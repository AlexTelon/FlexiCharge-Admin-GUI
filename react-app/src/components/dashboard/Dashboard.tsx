import React from 'react';
import { Helmet } from 'react-helmet';
import { Box } from '@material-ui/core';
import { Route, Redirect, Link } from 'react-router-dom';
import { authenticationProvider } from '../../remote-access';
import ChargerStations from '../charger-stations/ChargerStations';
import Navbar from '../navigation/Navbar';

const Dashboard = (props: any) => {
  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <Navbar />
      <Box sx={{ position: 'relative' }}>
        <Link to="/dashboard/chargers">asdddddddddddddddddddddddddddddddddddddddddddddddddddddd</Link>
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