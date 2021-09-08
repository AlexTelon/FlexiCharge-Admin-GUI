import React from 'react';
import { Paper, makeStyles, createStyles, Theme, AppBar, Toolbar, Typography, InputAdornment, TextField, Button } from '@material-ui/core';
import './Login.css';
import { Lock, Person } from '@material-ui/icons';
import backgroundLogo from '../../assets/logo.svg';
import backgroundTitle from '../../assets/title.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loginPaper: {
      background: '#ffffff'
    },
    buttonStyle: {
      marginTop: '25px',
      borderRadius: '1.5rem',
      width: '2rem',
      height: '1.5rem',
      backgroundColor: '#78bd76',
      color: '#ffffff',
      marginBottom: '.5rem',
      border: 'none'
    },
    appBar: {
      backgroundColor: '#78bd76',
      marginBottom: '1rem'
    },
    inputField: {
      marginTop: '1rem'
    }
  })
);

const LoginFields = () => {
  const classes = useStyles();
  return (
    <>
      <div className="login-input-fields">
        <TextField className={classes.inputField}
          id="input-with-icon-textfield" label="username" variant="filled" InputProps={{
            startAdornment: (<InputAdornment position="start">
              <Person />
            </InputAdornment>)
          }} />
        <TextField className={classes.inputField}
          id="input-with-icon-textfield" label="password" variant="filled" InputProps={{
            startAdornment: (<InputAdornment position="start">
              <Lock />
            </InputAdornment>)
          }} />
        <Button className={classes.buttonStyle} variant="outlined">Login</Button>
      </div>
    </>
  );
};

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <div className="login-page">
        <div className="flexicharge-logo-title">
          <img src={backgroundLogo} alt="1234" />
          <img src={backgroundTitle} alt="1234" />
        </div>
        <div className="login-form-wrapper col-10 col-md-3">
          <Paper className={classes.loginPaper} elevation={7}>
            <AppBar className={classes.appBar} position="static">
              <Toolbar>
                <Typography variant="h6">
                  Admin Portal
                </Typography>
              </Toolbar>
            </AppBar>
            <LoginFields />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Login;