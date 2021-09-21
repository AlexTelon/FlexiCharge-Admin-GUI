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
import ChargersPage from '../chargers/Chargers';
import ManageUsers from '../../components/manage-users/ManageUsers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BoxSpacing: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(2)
    },
    hoverEffect: {
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: theme.flexiCharge.primary.lightGrey
      }
    }
  })
);

const DashboardHome = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid 
      container
    > 
      <Grid
        onClick={() => {
          history.push('/dashboard/stations');
        }}
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <ChargerStation className={classes.hoverEffect} />
      </Grid>
      <Grid
        onClick={() => {
          history.push('/dashboard/chargers');
        }}
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <Chargers className={classes.hoverEffect} />
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
          <Route path="/dashboard" exact render={() => (<DashboardHome />)} />
          <Route path="/dashboard/stations" exact render={() => (<ChargerStations />)} />
          <Route path="/dashboard/chargers" exact render={() => (<ChargersPage />)} />
          <Route path="/dashboard/users" exact render={() => (<ManageUsers />) } />
        </Box>
        <Box component="main" sx={{ flexGrow: 1 }}>
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