import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import { ReactComponent as Title } from '../../assets/title.svg';
import { Icon } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EvStationIcon from '@material-ui/icons/EvStation';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from 'react-router';
import { Receipt } from '@material-ui/icons';
import theme from '@/components/theme';

// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  drawerWidth: {
    width: '15%',
    [theme.breakpoints.up('sm')]: {
      width: '9%'
    }
  }
};

const categories = [
  {
    id: '',
    children: [
      { id: 'Dashboard', icon: <DashboardIcon />, location: '/Dashboard', active: false },
      { id: 'Charger Station', icon: <EvStationIcon />, location: '/Dashboard/stations' },
      { id: 'Chargers', icon: <BatteryChargingFullIcon />, location: '/Dashboard/chargers' },
      { id: 'Invoices', icon: <Receipt />, location: '/Dashboard/invoices' },
      { id: 'Users', icon: <PeopleIcon />, location: '/Dashboard/users' }
    ]
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: styles.drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        color: theme.flexiCharge.primary.white
      }
    },
    drawerOpen: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      overflowX: 'hidden',
      width: styles.drawerWidth.width,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    drawerClose: {
      width: styles.drawerWidth.width,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    content: {
      flexGrow: 1
    },
    navBotSection: {
      bottom: 0,
      marginTop: 'auto',
      paddingLeft: theme.spacing(1)
    },
    categoryHeader: {
      paddingTop: theme.spacing(3),
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
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px'
      }
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(1),
      color: theme.flexiCharge.primary.darkGrey,
      paddingTop: theme.spacing(0)
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
    }
  })
);

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToogle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  };

  const history = useHistory();

  return (
    <>
      <Drawer
        variant="permanent"
        open={mobileOpen}
        onClose={handleDrawerToogle}
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
        {/* <Divider />
        <List className={classes.categoryHeader}>
          <Title />
        </List> */}
        
        {categories.map(({ id, children }) => 

          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
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
                className= {clsx(classes.item)}
                onClick={() => {
                  history.push(pathLocation);
                }}
                data-cy={`${childId}-btn`}
              >
                <ListItemIcon color='primary' className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText classes={{ primary: classes.itemText }}>
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
          </React.Fragment>
        
        )}
        {/* 
        <Divider />
  
        <List>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToogle}
            className={classes.MenuButton}
          >
            <MenuIcon />
          </IconButton>
        </List> */}
              
        <Divider />
        
        <List className={classes.navBotSection}>
          <ListItem button onClick={() => { handleLogout(); }}>
            <ListItemIcon>
              <Icon className={classes.itemIcon}>logout</Icon>
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </ListItem>
          <Divider />
          <ListItem
            button

            onClick={() => {
              !open ? handleDrawerOpen() : handleDrawerClose();
            }}
          >
            {!open ? <ChevronRightIcon color="inherit" /> : <ChevronLeftIcon />}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}