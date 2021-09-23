import React, { FC, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/styles';
import {
  createStyles, makeStyles, Theme, Box, 
  AppBar, Toolbar, Typography, Container, Grid, 
  IconButton, TableContainer, TableHead, Table, 
  TableProps, TableRow, Checkbox, TableCell, 
  useMediaQuery, TableBody, Paper, LinearProgress, 
  TablePagination, Button, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Divider 
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Edit, ExpandMore, FilterList } from '@material-ui/icons';
import { ManageUser } from '../../remote-access/interfaces';
import { manageUserCollection } from '../../remote-access/index';
import AddSingleUserDialog from './AddUserDialog';
import AddIcon from '@material-ui/icons/Add';
import ManageUsersEditPanel from './ManageUsersEditPanel';

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

interface userRowProps {
  user: ManageUser
  classes: any
  editClicked: (userId: string) => void
}

const UserRow: FC<userRowProps> = ({ user, classes, editClicked }) => {
  // const [open, setOpen] = useState(false);
  const theme: Theme = useTheme();

  return (
    <>
      <TableRow 
        hover
        key={user.id}
        style={{ backgroundColor: theme.flexiCharge.primary.white }} >
        <TableCell padding='checkbox'>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography
              color='textPrimary'
              variant='body1'
              className={classes.usernameCell}
              noWrap
            >
              {user.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          {user.payment}
        </TableCell>
        <TableCell>
          {user.role}
        </TableCell>
        <TableCell align="right">
          <Button
            startIcon={<Edit />}
            className={classes.buttonLight}
            variant="contained"
            color="primary"
            onClick={() => editClicked(user.id)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

interface UserTableState {
  loaded?: boolean
  users?: ManageUser[]
  error?: boolean
  errorMessage?: string
}

const UserTable = ({ classes, ...rest }: any) => {
  const [state, setState] = useState<UserTableState>({
    loaded: false
  });

  useEffect(() => {
    manageUserCollection.getAllUsers().then((users) => {
      setState({
        loaded: true,
        users
      });
    }).catch((_) => {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to load'
      });
    });
  }, []);
  
  let userRows = null;
  if (state.users) {
    userRows = [];
    const length = state.users.length > 5 ? 5 : state.users.length;
    for (let i = 0; i < length; i++) {
      const user = state.users[i];
      userRows.push(<UserRow key={user.id} {...rest} user={user} classes={classes} />);
    }
  }

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    //
  };

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        {!state.loaded &&
                <LinearProgress />
        }
        <Table {...tableProps} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox className={classes.checkBox} />
              </TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{userRows}</TableBody>
        </Table>
      </TableContainer>
      {state.users &&
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={state.users ? state.users.length : 0}
        rowsPerPage={5}
        page={0}
        onPageChange={handleChangePage}
      />
      }
    </>
  );
};

const UserSettingsAccordian = ({ classes }: any) => {
  const [openAddUserDialog, setOpenAddUserDialog] = useState<boolean>(false);
  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };
  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="manage-user-action-panel"
        id="manage-user-actions-panel-header"
      >
        <Grid container id="manage-user-actions-panel">
          <Grid item xs={9} md={10}>
            <Typography>
              0 selected
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            More Actions
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button startIcon={<AddIcon />} variant="contained" className={classes.buttonLight} color='primary' onClick={handleOpenAddUserDialog}>
         Add User
        </Button>
      </AccordionActions>

      <AddSingleUserDialog open={openAddUserDialog} handleClose={handleCloseAddUserDialog} />
    </Accordion>
  );
};

const ManageUsers = () => {
  const classes = useStyles();
  const [activeUserId, setActiveUserId] = useState<string>();

  const handleUserEditClicked = (userId: string) => {
    setActiveUserId(userId);
  };

  return (
    <>
      <Helmet>
        <title>Admin | Users</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <AppBar position="sticky" className={classes.appBar}> 
          <Toolbar variant="dense">
            <Typography variant="h6">
                Flexi Charge
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.contentBox}>
          <Container component="section" className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid item xs={12} md={8} lg={9}>
                <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant="dense">
                    <Typography className={classes.contentTitle} variant="h6">
                      Users
                    </Typography>
                    <IconButton edge="end"
                      aria-label="users filter"
                      aria-haspopup="true"
                      aria-controls="user-filters"
                      color="inherit"
                    >
                      <FilterList />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <UserSettingsAccordian classes={classes} />
                <Paper elevation={2}>
                  <UserTable editClicked={handleUserEditClicked} classes= { classes } />
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