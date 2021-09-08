import React from 'react';
import { Paper, makeStyles, createStyles, Theme, AppBar, Toolbar, Typography, InputAdornment, TextField, Button } from '@material-ui/core';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Lock, Person } from '@material-ui/icons';
import backgroundLogo from '../../assets/logo.svg';
import backgroundTitle from '../../assets/title.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: '#fffff'
    },
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center'
    },
    loginPaper: {
      background: '#ffffff',
      height: '40vh',
      width: '25rem',
      margin: '200px auto'
    },
    usernameField: {
      marginTop: '50px',
      marginLeft: '4.6rem',
      margin: theme.spacing(1)
    },
    passwordField: {
      marginTop: '15px',
      marginLeft: '4.6rem'
    },
    buttonStyle: {
      marginTop: '25px',
      marginLeft: '9.5rem'
    },
    LogoTitle: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px auto'
    }
  })
);

const Login = () => {
  const classes = useStyles();

  return (
    <><div>
      <img className={classes.LogoTitle} src={backgroundLogo} alt="1234" />
      <img className={classes.LogoTitle} src={backgroundTitle} alt="1234" />
    </div><div className={classes.root}>
      <Paper className={classes.loginPaper} elevation={7}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Admin Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <TextField className={classes.usernameField}
            id="input-with-icon-textfield" label="username" variant="outlined" InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Person />
              </InputAdornment>)
            }} />
          <TextField className={classes.passwordField}
            id="input-with-icon-textfield" label="password" variant="outlined" InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Lock />
              </InputAdornment>)
            }} />
          <Button className={classes.buttonStyle} variant="outlined">Login</Button>
        </div>
      </Paper>
    </div></>
  );
};

export default Login;