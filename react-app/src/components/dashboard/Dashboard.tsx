import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, styled } from '@material-ui/core';
import { Route, Redirect, Link } from 'react-router-dom';
import { authenticationProvider } from '../../remote-access';
import ChargersPage from '../chargers/ChargersPage';

const DashboardLayout = styled('div')(
  ({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    height: '100%',
    width: '100%',
    flex: '1 1 auto',
    backgroundColor: 'yellow',
    overflow: 'hidden',
    [theme.breakpoints.up('xs')]: {
      backgroundColor: 'transparent'
    }
  })
);

const DashboardContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const Dashboard = (props: any) => {
  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <DashboardContainer>
          <DashboardContent>
            <Box sx={{ position: 'absolute' }}>
              <Link to="/dashboard/chargers">asd</Link>
            </Box>
            <Route path="/dashboard/chargers" render={() => (<ChargersPage />)} />
          </DashboardContent>
        </DashboardContainer>
      </DashboardLayout>
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