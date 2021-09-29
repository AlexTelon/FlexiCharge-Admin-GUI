/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useRef, useState } from 'react';
import {
  createStyles, makeStyles, Theme, Box, 
  AppBar, Toolbar, Typography, Container, Grid, 
  IconButton, Paper, Tabs, Tab, Divider 
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { FilterList } from '@material-ui/icons';
import ManageUsersEditPanel from './ManageUsersEditPanel';
import UserSettingsAccordian from './ManageUsersSettingsAccordian';
import UserTable from './ManageUsersTable';
import ManageUserTabs from './ManageUsersTab';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appBar: {
      backgroundColor: theme.flexiCharge.accent.primary,
      color: theme.flexiCharge.primary.white,
      fontFamily: theme.flexiCharge.font._main
    },
    contentBox: {
      paddingTop: theme.spacing(2),
      width: '100%',
      height: '100%',
      maxHeight: '100%',
      top: 0,
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(1)
      }
    },
    contentTitle: {
      flexGrow: 1
    },
    contentSection: {
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    contentContainer: {
      background: 'transparent',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse'
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse'
      }
    },
    contentAppBar: {
      backgroundColor: theme.flexiCharge.primary.white,
      color: theme.flexiCharge.primary.darkGrey,
      fontFamily: theme.flexiCharge.font._main
    },
    checkBox: {
      color: theme.flexiCharge.accent.primary,
      '&:checked': {
        color: theme.flexiCharge.accent.neutral
      },
      checked: {
        color: theme.flexiCharge.accent.neutral
      }
    },
    buttonDark: {
      color: theme.flexiCharge.accent.primary
    },
    buttonLight: {
      color: theme.flexiCharge.primary.white
    },
    usernameCell: {
      maxWidth: '15vw'
    },
    tableContainer: {
      maxHeight: '600px',
      marginTop: theme.spacing(1)
    }
  })
);

const ManageUsers = () => {
  const classes = useStyles();
  const [activeUserId, setActiveUserId] = useState<string>();
  const [selectedUsers, setSelectedUsers] = useState<readonly string[]>([]);
  const usersTable = useRef(null);
  const handleUserEditClicked = (userId: string) => {
    setActiveUserId(userId);
  };

  return (
    <>
      <Helmet>
        <title>Admin | Users</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <Box className={classes.contentBox}>
          <Container component="section" className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid item xs={12} md={8} lg={9}>
                <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant="dense">
                    <Typography className={classes.contentTitle} variant="h6">
                      <ManageUserTabs />
                    </Typography>
                    <IconButton edge="end"
                      aria-label="users filter"
                      aria-haspopup="true"
                      aria-controls="user-filters"
                      color="inherit"
                      onClick={ () => setActiveUserId('')}
                    >
                      <FilterList />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <UserSettingsAccordian selectedUsers={selectedUsers} />
                <Paper elevation={2}>
                  <UserTable ref={usersTable} editClicked={handleUserEditClicked} setSelectedUsers={setSelectedUsers} classes= { classes } />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <ManageUsersEditPanel userId={activeUserId} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ManageUsers;