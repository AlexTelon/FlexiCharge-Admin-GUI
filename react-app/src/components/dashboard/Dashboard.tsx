import React from 'react';
import { Helmet } from 'react-helmet';
import { Box } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import { authenticationProvider } from '../../remote-access';
import ChargerStations from '../charger-stations/ChargerStations';
import Chargers from '../chargers/Chargers';
import Navbar from '../navigation/Navbar';

const Dashboard = (props: any) => {
  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Route path="/dashboard/stations" render={() => (<ChargerStations />)} />
          <Route path="/dashboard/chargers" render={() => (<Chargers />)} />
        </Box>
      </Box>
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