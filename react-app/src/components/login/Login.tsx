import React, { useState } from 'react';
import { Paper, makeStyles, createStyles, Theme, AppBar, Toolbar, Typography, InputAdornment, TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Alert } from '@material-ui/lab';
import './Login.css';
import { Lock, Person } from '@material-ui/icons';
import backgroundLogo from '../../assets/logo.svg';
import backgroundTitle from '../../assets/title.svg';
import { authenticationProvider } from '../../remote-access';

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
      background: '#ffffff',
      paddingBottom: '1.5rem'
    },
    buttonStyle: {
      marginTop: '1.5rem',
      borderRadius: '1.5rem',
      width: '7rem',
      height: '2rem',
      backgroundColor: '#78bd76',
      color: '#ffffff',
      marginBottom: '.5rem',
      border: 'none'
    },
    appBar: {
      backgroundColor: '#78bd76',
      marginBottom: '1rem',
      alignItems: 'center'
    },
    inputField: {
      marginTop: '1rem'
    },
    alertBox: {
      width: '100%'
    }
  })
);

const LoginFields = () => {
  const classes = useStyles();
  const [password, setPassword] = useState<string>();
  const [username, setUserame] = useState<string>();
  const [errorState, setErrorState] = useState<any>({});
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserame(e.target.value);
  };
  const handleSubmitClicked = async () => {
    if (username && password) {
      const [wasSuccess, errors] = await authenticationProvider.login(username, password);
      if (wasSuccess) {
        setErrorState({});
        // goto dashboard
      } else if (errors.invalidCredentials) {
        setErrorState({
          alertError: 'Invalid credentials'
        });
      }
    } else {
      setErrorState({
        usernameError: !username ? 'Required' : undefined,
        passwordError: !password ? 'Required' : undefined
      });
    }
  };

  console.log(authenticationProvider);
  if (authenticationProvider.isAuthenticated) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  return (
    <>
      <form className="login-input-fields">
        {errorState.alertError !== undefined &&
          <Alert className={classes.alertBox} severity="warning">{errorState.alertError}</Alert>
        }
        <TextField 
          className={classes.inputField}
          onChange={handleUsernameChange}
          id="input-with-icon-textfield"
          label="Username"
          size="small"
          value={username}
          error={errorState.usernameError !== undefined}
          helperText={errorState.usernameError}
          variant="standard" InputProps={{
            startAdornment: (<InputAdornment position="start">
              <Person />
            </InputAdornment>)
          }} />
        <TextField
          className={classes.inputField}
          onChange={handlePasswordChange}
          id="input-with-icon-textfield"
          label="Password"
          type="password"
          variant="standard"
          size="small"
          value={password}
          error={errorState.passwordError !== undefined}
          helperText={errorState.passwordError}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
              <Lock />
            </InputAdornment>)
          }} />
        <Button onClick={handleSubmitClicked} className={classes.buttonStyle} variant="outlined">Login</Button>
      </form>
    </>
  );
};

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <div className="login-page">
        <div className="flexicharge-logo-title container row">
          <img className="col-3 col-md-2" src={backgroundLogo} alt="logo" />
          <img className="col-10 col-md-6" src={backgroundTitle} alt="title" />
        </div>
        <div className="login-form-wrapper col-10 col-md-3">
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