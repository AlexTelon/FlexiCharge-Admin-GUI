import React from 'react';
import { Paper, makeStyles, createStyles, Theme, AppBar, Toolbar, Typography, InputAdornment, TextField, Button } from '@material-ui/core';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Lock, Person } from '@material-ui/icons';
import backgroundLogo from '../../assets/logo.svg';
import backgroundTitle from '../../assets/title.svg';

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
    },
    logoStyle: {
      width: '10rem',
      height: '10.5rem'
    },
    titleStyle: {
      width: '40rem',
      height: '5rem'
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
          id="input-with-icon-textfield" label="password" type="password" variant="filled" InputProps={{
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
        <div className="flexicharge-logo-title col-4 col-xl-5">
          <img className={classes.logoStyle} src={backgroundLogo} alt="logo" />
          <img className={classes.titleStyle} src={backgroundTitle} alt="title" />
        </div>
        <div className="login-form-wrapper col-4 col-sm-3">
          <Paper className={classes.loginPaper} elevation={7}>
            <AppBar className={classes.appBar} position="static">
              <Toolbar>
                <Typography variant="h6">
                  <h4 className="paper-title">Admin Portal</h4>
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