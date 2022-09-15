/* eslint-disable */ 
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useRef, useState } from 'react';
import {
  createStyles, makeStyles, Theme, Box, 
  AppBar, Toolbar, Typography, Container, Grid, 
  IconButton, Paper, Tab, alpha, InputBase, styled 
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Replay, ThumbUpSharp } from '@material-ui/icons';
import { ManageAdmin, ManageUser } from '@/remote-access/types';
import ManageUsersEditPanel from '@/components/manage-users/Users/ManageUsersEditPanel';
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  color: 'black',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.flexiCharge.primary.lightGrey, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  backgroundColor: 'transparent',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const RenderInvoices = () => {
  const classes = useStyles();
  const [state, setState] = useState<any>({
    loaded: false
  });
  const [reload, setReload] = useState<boolean>(false);
  const [searchedUsers, setSearchUsers] = useState<ManageUser[]>([]);
  const [searchedAdmins, setSearchAdmins] = useState<ManageAdmin[]>([]);
  const [search, setSearch] = useState<string>();
  const [activeUser, setActiveUser] = useState<string | undefined>();
  // const [selectedAdmins, setSelectedAdmins] = useState<readonly string[]>([]);
  // const [selectedUsers, setSelectedUsers] = useState<readonly string[]>([]);
  const [selectedTab, setSelectedTab] = React.useState('users');
  const usersTable = useRef(null);
  const adminsTable = useRef(null);

  const handleEditClicked = (username: string) => {
    setActiveUser(username);
  };

  const handleTabChange = (event: any, newTab: string) => {
    setSelectedTab(newTab);
    setActiveUser(undefined);
    setReload(true);
  };

  const dummyData = ['Jakoob', 'Philip', 'Kyrollos', 'Daniel', 'Hasan'];
  const dummyDataV2 = ['Rob', 'Mattias', 'Jasmin', 'Peter', 'Ragnar', 'Anders', "Tompa", "Kaitao"];

  const handleSearch = (searchText: string) => {
    if (searchText !== '') {
      setSearch(searchText);

      if (selectedTab === 'users') {
        const users = state.users.filter((user: ManageUser) => {        
          return user.name?.toLowerCase().includes(searchText.toLowerCase())
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            || user.username.toLowerCase().includes(searchText.toLowerCase())
            || user.email?.toLowerCase().includes(searchText.toLowerCase());
        });
        setSearchUsers(users);  
      } else {
        const admins = state.admins.filter((admin: ManageAdmin) => {
          return admin.name?.toLowerCase().includes(searchText.toLowerCase())
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            || admin.username.toLowerCase().includes(searchText.toLowerCase())
            || admin.email?.toLowerCase().includes(searchText.toLowerCase());
        });
        setSearchAdmins(admins);
      }
    } else {
      setSearch(undefined);
      setReload(true);
    }
  };
  
  function useEffect() {
    if (selectedTab === 'create-invoices') {
      console.log('viewing create invoices');
      return dummyData;
    } else {
      console.log('viewing create individual nvoices');
      return dummyData;
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Invoices</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <Box className={classes.contentBox}>
          <Container component="section" className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid item xs={12} md={activeUser !== undefined ? 8 : 12} lg={activeUser !== undefined ? 9 : 12}>
                <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant="dense">
                    <Typography className={classes.contentTitle} variant="h6">
                      <TabContext value={selectedTab}>
                        <TabList onChange={handleTabChange} indicatorColor="primary">
                          <Tab label="Create Invoices" value="create-invoices" />
                          <Tab label="Create Individual Invoices" value="create-individual-invoices" />
                        </TabList>
                      </TabContext>
                    </Typography>
                  </Toolbar>
                </AppBar>
                {selectedTab === 'create-invoices' &&
                    <>
                      <ol> 
                        {
                          dummyData.map((user: string) => ( <li>{user}</li> ))
                        }
                      </ol>
                    </>
                }
                {selectedTab === 'create-individual-invoices' &&
                    <>
                      <ol> 
                        {
                          dummyDataV2.map((user: string) => ( <li>{user}</li> ))
                        }
                      </ol>
                    </>
                }
                <Paper elevation={2}>
                  <TabContext value={selectedTab}>
                    <TabPanel style={{ padding: 0 }} value="all-invoices">
                    <>
                      <ol> 
                        {
                          dummyData.map((user: string) => ( <li>{user}</li> ))
                        }
                      </ol>
                    </>
                    </TabPanel>
                    <TabPanel style={{ padding: 0 }} value="individual-invoices">
                    <>
                      <ol> 
                        {
                          dummyDataV2.map((user: string) => ( <li>{user}</li> ))
                        }
                      </ol>
                    </>
                    </TabPanel>
                  </TabContext>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                {selectedTab === 'all-invoices' &&
                  <h6>All Invoices</h6>
                }
                {selectedTab === 'individual-invoices' &&
                  <h6>Individual Invoices</h6>
                }
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default RenderInvoices;
