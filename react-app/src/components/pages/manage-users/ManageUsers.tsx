/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useRef, useState } from 'react';
import {
  createStyles, makeStyles, Theme, Box, 
  AppBar, Toolbar, Typography, Container, Grid, 
  IconButton, Paper, Tab 
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Edit, ExpandMore, FilterList } from '@material-ui/icons';
import { ManageUser } from '@/remote-access/types';
import { manageUserCollection } from '@/remote-access';
import AddSingleUserDialog from './AddUserDialog';
import AddIcon from '@material-ui/icons/Add';
import ManageUsersEditPanel from './ManageUsersEditPanel';
import ManageAdminsEditPanel from '@/components/manage-users/Admins/ManageAdminEditPanel';
import AdminSettingsAccordian from '@/components/manage-users/Admins/ManageAdminsSettingsAccordian';
import AdminTable from '@/components/manage-users/Admins/ManageAdminsTable';
import UserSettingsAccordian from '@/components/manage-users/Users/ManageUsersSettingsAccordian';
import UserTable from '@/components/manage-users/Users/ManageUsersTable';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

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
  const [activeId, setActiveId] = useState<string | undefined>();
  const [selectedAdmins, setSelectedAdmins] = useState<readonly string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<readonly string[]>([]);
  const [selectedTab, setSelectedTab] = React.useState('users');
  const usersTable = useRef(null);
  const adminsTable = useRef(null);

  const handleEditClicked = (id: string) => {
    setActiveId(id);
  };

  const handleTabChange = (event: any, newTab: string) => {
    setSelectedTab(newTab);
    setActiveId(undefined);
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
                      <TabContext value={selectedTab}>
                        <TabList onChange={handleTabChange} indicatorColor="primary">
                          <Tab label="Users" value="users" />
                          <Tab label="Admins" value="admins" />
                        </TabList>
                      </TabContext>
                    </Typography>
                    <IconButton edge="end"
                      aria-label="users filter"
                      aria-haspopup="true"
                      aria-controls="user-filters"
                      color="inherit"
                      onClick={ () => setActiveId('')}
                    >
                      <FilterList />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                {selectedTab === 'users' &&
                    <>
                      <UserSettingsAccordian selectedUsers={selectedUsers} />
                    </>
                }
                {selectedTab === 'admins' &&
                    <>
                      <AdminSettingsAccordian selectedAdmins={selectedAdmins} />
                    </>
                }
                <Paper elevation={2}>
                  <TabContext value={selectedTab}>
                    <TabPanel value="users">
                      <UserTable ref={usersTable} editClicked={handleEditClicked} setSelectedUsers={setSelectedUsers} classes={classes} />
                    </TabPanel>
                    <TabPanel value="admins">
                      <AdminTable ref={adminsTable} editClicked={handleEditClicked} setSelectedAdmins={setSelectedAdmins} classes={classes} />
                    </TabPanel>
                  </TabContext>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                {selectedTab === 'users' &&
                  <>
                    <ManageUsersEditPanel userId={activeId} />
                  </>
                }
                {selectedTab === 'admins' &&
                  <>
                    <ManageAdminsEditPanel adminId={activeId} />
                  </>
                }
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ManageUsers;