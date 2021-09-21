/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useTheme } from '@material-ui/styles';
import { createStyles, makeStyles, Theme, Box, AppBar, Toolbar, Typography, Container, Grid, IconButton, TableContainer, TableHead, Table, TableProps, TableRow, Checkbox, TableCell, useMediaQuery, TableBody, Paper } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { FilterList } from '@material-ui/icons';
import { ManageUser } from '../../remote-access/interfaces';

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
    usernameCell: {
      maxWidth: '15vw'
    },
    tableContainer: {
      maxHeight: '600px',
      marginTop: theme.spacing(1)
    }
  })
);

// interface userRowProps {
//   user: ManageUser
//   classes: any
// }

const UserRow = (props: any) => {
  const theme: Theme = useTheme();

  return (
    <>
      <TableRow hover
        style={{ backgroundColor: theme.flexiCharge.primary.white }} >
        <TableCell padding='checkbox'>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography
              color='textPrimary'
              variant='body1'
              className={props.classes.usernameCell}
              noWrap
            >
              {props.name}   
            </Typography>
          </Box>
        </TableCell>
        <TableCell></TableCell>
        
      </TableRow>
    </>
  );
};

const UserTable = ({ classes }: any) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    //
  };

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };
  const userRows = [];

  for (let i = 0; i < 10; i++) {
    userRows.push(<UserRow classes={classes} />);
  }
  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table {...tableProps} stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox className={classes.checkBox} />
              </TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
            <TableBody>{userRows}</TableBody>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};

const ManageUsers = () => {
  const classes = useStyles();
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
                <Paper elevation={2}>
                  <UserTable classes={classes} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ManageUsers;