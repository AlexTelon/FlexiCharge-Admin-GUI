/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Grid } from '@material-ui/core';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { authenticationProvider } from '../../remote-access';
import ChargerStations from '../charger-stations/ChargerStations';
import Navbar from '../navigation/Navbar';
import ChargerStation from '../dashboard/dashboardComponents/ChargerStation';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chargers from '../dashboard/dashboardComponents/Chargers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BoxSpacing: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2)
    }
  })
);

const DashboardHome = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid 
      container
      className={classes.BoxSpacing}
    > 
      <Grid
        onClick={() => {
          history.push('/dashboard/Chargers');
        }}
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <ChargerStation />
      </Grid>
      <Grid
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <Chargers />
      </Grid>
      <Grid
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
      </Grid>
      <Grid
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
      </Grid>
    </Grid>
  );
};

const Dashboard = (props: any) => {
  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Navbar />
        <Box component="main" style={{ width: '100%' }}>
          <Route path="/dashboard/chargers" render={() => (<ChargerStations />)} />
          <Route path="/dashboard" render={() => (<DashboardHome />)} />
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