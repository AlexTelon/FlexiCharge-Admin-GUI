import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, type Theme, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlexichargeLogoDark from '@/assets/logo-dark-min.svg';
import FlexichargeTitleDark from '@/assets/title-dark-min.svg';
import { Icon } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EvStationIcon from '@material-ui/icons/EvStation';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from 'react-router';
import { Receipt } from '@material-ui/icons';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import LogoutConfirmationDialog from './LogoutConfirmationDialog';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        color: theme.flexiCharge.primary.white
      }
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    content: {
      flexGrow: 1
    },
    openDrawButton: {
      float: 'right',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    navBotSection: {
      bottom: 0,
      marginTop: 'auto',
      paddingLeft: theme.spacing(1)
    },
    categoryHeader: {
      paddingTop: 0,
      paddingLeft: theme.spacing(3),
      display: 'flex'
    },
    listPosition: {
      paddingLeft: theme.spacing(1)
    },
    headerPosition: {
      width: '100px'
    },
    item: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover,&:focus': {
        backgroundColor: theme.flexiCharge.primary.lightGrey
      }
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(1),
      color: theme.flexiCharge.primary.darkGrey,
      paddingTop: theme.spacing(0)
    },
    itemLogo: {
      width: '25px',
      height: '25px'
    },
    itemText: {
      fontSize: 'inherit',
      paddingLeft: theme.spacing(2),
      color: theme.flexiCharge.primary.darkGrey
    },
    MenuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    flexichargeLogo: {
      background: 'linear-gradient(90deg, #f0c200 0%, #76bd76 77%, #409c68 100%)',
      '&:hover,&:focus': {
        backgroundColor: theme.flexiCharge.accent.secondary
      }
    },
    flexichargeTitle: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      width: '150px'
    }
  })
);

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(isDesktop);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const categories = [
    {
      id: '',
      children: [
        { id: 'Flexicharge', icon: <img className={classes.itemLogo} src={FlexichargeLogoDark} alt="logo" />, location: '/Dashboard', active: false },
        { id: 'Dashboard', icon: <DashboardIcon />, location: '/Dashboard', active: false },
        { id: 'Charge-points', icon: <EvStationIcon />, location: '/Dashboard/chargepoints' },
        { id: 'Chargers', icon: <BatteryChargingFullIcon />, location: '/Dashboard/chargers' },
        { id: 'Invoices', icon: <Receipt />, location: '/Dashboard/invoices' },
        { id: 'Users', icon: <PeopleIcon />, location: '/Dashboard/users' }
      ]
    }
  ];

  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const history = useHistory();

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >

        {categories.map(({ id, children }) =>
          <React.Fragment key={id}>
            <ListItem
              style={{ marginTop: '-16px' }}
              className={clsx(classes.categoryHeader)}>
              <ListItemText classes={{
                primary: classes.itemText
              }}>
                {id}
              </ListItemText>
            </ListItem>

            {children.map(({ id: childId, icon, location: pathLocation }) => (
              <ListItem
                key={childId}
                button
                color="primary"
                className={clsx(classes.item, {
                  [classes.flexichargeLogo]: childId === 'Flexicharge'
                })}
                onClick={() => {
                  history.push(pathLocation);
                }}
                data-cy={`${childId}-btn`}
              >
                <ListItemIcon color='primary' className={classes.itemIcon}>{icon}</ListItemIcon>
                {childId === 'Flexicharge' ?
                  (
                    <ListItemIcon className={classes.itemIcon}>
                      <img className={classes.flexichargeTitle} src={FlexichargeTitleDark} alt="title" />
                    </ListItemIcon>
                  )
                  :
                  (
                    <ListItemText classes={{ primary: classes.itemText }}>
                      {childId}
                    </ListItemText>
                  )
                }
              </ListItem>
            ))}
          </React.Fragment>

        )}

        <Divider />

        <List className={classes.navBotSection}>
          <ListItem button onClick={handleOpenLogoutDialog}>
            <ListItemIcon>
              <Icon className={classes.itemIcon}>logout</Icon>
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </ListItem>
          <LogoutConfirmationDialog
            open={logoutDialogOpen}
            handleLogout={handleLogout}
            handleClose={handleCloseLogoutDialog}
          />
        </List>
      </Drawer>
    </>
  );
}