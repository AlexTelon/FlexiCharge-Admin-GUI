/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { authenticationProvider } from '@/remote-access';
import ChargerStations from '../charger-stations/ChargerStations';
import Navbar from './dashboardComponents/Navbar';
import ChargerStation from './dashboardComponents/ChargerStation';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chargers from './dashboardComponents/Chargers';
import ChargersPage from '../chargers';
import InvoicesPage from '../invoices/InvoicesPage';
import ManageUsers from '../manage-users/ManageUsers';
import UsersDashboardComponent from './dashboardComponents/Users';
import Sales from './dashboardComponents/Sales';
import ChargerStationMap from './dashboardComponents/ChargerStationMap';
import AdminsDashboardComponent from './dashboardComponents/Admins';
import axios from 'axios';
import NotFoundPage from '../NotFoundPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BoxSpacing: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(2)
    },
    hoverEffect: {
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: theme.flexiCharge.primary.lightGrey
      }
    },
    appBar: {
      backgroundColor: theme.flexiCharge.accent.primary,
      color: theme.flexiCharge.primary.white,
      fontFamily: theme.flexiCharge.font._main
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
          history.push('/dashboard/users');
        }}
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <UsersDashboardComponent className={classes.hoverEffect} />
      </Grid>
      <Grid
        onClick={() => {
          history.push('/dashboard/users');
        }}
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <AdminsDashboardComponent className={classes.hoverEffect} />
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
        className={classes.BoxSpacing}
        item
        xs={12}
        md={12}
        lg={7}
        xl={8}
      >
        <Sales />
      </Grid>
      <Grid
        className={classes.BoxSpacing}
        item
        xs={12}
        md={12}
        lg={5}
        xl={4}
      >
        <ChargerStationMap />
      </Grid>
    </Grid>
  );
};

const Dashboard = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Navbar />
        <Box component="main" style={{ width: '100%' }}>
          <AppBar position="sticky" className={classes.appBar} >
            <Toolbar variant="dense">
              <Typography variant="h6">
                Flexi Charge
              </Typography>
            </Toolbar>
          </AppBar>
          <Route path="/dashboard" exact render={() => (<DashboardHome />)} />
          <Route path="/dashboard/stations" exact render={() => (<ChargerStations />)} />
          <Route path="/dashboard/chargers" exact render={(props) => (<ChargersPage {...props} />)} />
          <Route path="/dashboard/chargers/:stationId" exact render={(props) => (<ChargersPage {...props} />)} />
          <Route path="/dashboard/invoices" exact render={() => (<InvoicesPage />) } />
          <Route path="/dashboard/users" exact render={() => (<ManageUsers />) } />
          <Route path="/dashboard/*" exact render={() => (<NotFoundPage />) } />
          <Route path="/stations/*" exact render={() => (<NotFoundPage />) } />
          <Route path="/chargers/*" exact render={() => (<NotFoundPage />) } />
          <Route path="/chargers/:stationId/*" exact render={() => (<NotFoundPage />) } />
          <Route path="/invoices/*" exact render={() => (<NotFoundPage />) } />
          <Route path="/users/*" exact render={() => (<NotFoundPage />) } />
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
      return localStorage.getItem('isAuthenticated')
        ? <Dashboard />
        : <Redirect to='/login' />;
    }} />
  );
};

export default Dashboard;