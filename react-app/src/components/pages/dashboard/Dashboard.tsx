/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { authenticationProvider } from '@/remote-access';
import ChargePoints from '../charger-points/ChargePoints';
import Navbar from './dashboardComponents/Navbar';
import ChargePoint from './dashboardComponents/ChargePoint';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chargers from './dashboardComponents/Chargers';
import ChargersPage from '../chargers';
import InvoicesPage from '../invoices/InvoicesPage';
import ManageUsers from '../manage-users/ManageUsers';
import UsersDashboardComponent from './dashboardComponents/Users';
import Sales from './dashboardComponents/Sales';
import ChargerPointMap from './dashboardComponents/ChargePointMap';
import AdminsDashboardComponent from './dashboardComponents/Admins';
import axios from 'axios';
import { ProtectedRoute } from '@/components/protectedRoute/ProttectedRoute';

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
          history.push('/dashboard/chargepoints');
        }}
        className={classes.BoxSpacing}
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <ChargePoint className={classes.hoverEffect} />
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
        <ChargerPointMap fetchChargePoints={true} enableAddMarker={false} />
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
          <ProtectedRoute path='/dashboard' exact>
            <DashboardHome />
          </ProtectedRoute>
          <ProtectedRoute path='/dashboard/stations' exact>
            <ChargePoints />
          </ProtectedRoute>
          <ProtectedRoute path='/dashboard/chargers' exact>
            <ChargersPage />
          </ProtectedRoute>
          <ProtectedRoute path='/dashboard/chargers/:stationId' exact>
            <ChargersPage />
          </ProtectedRoute>
          <ProtectedRoute path='/dashboard/invoices' exact>
            <InvoicesPage />
          </ProtectedRoute>
          <ProtectedRoute path='/dashboard/users' exact>
            <ManageUsers />
          </ProtectedRoute>
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
      return sessionStorage.getItem('isAuthenticated')
        ? <Dashboard />
        : <Redirect to='/login' />;
        
    }} />
  );
};

export default Dashboard;