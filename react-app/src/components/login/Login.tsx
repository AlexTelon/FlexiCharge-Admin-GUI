import React, { FC, useState } from 'react';
import {
  Paper, makeStyles, createStyles, Theme, AppBar, Toolbar,
  Typography, InputAdornment, TextField, Button, LinearProgress
} from '@material-ui/core';
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
      background: theme.flexiCharge.primary.white,
      paddingBottom: '1.5rem'
    },
    buttonStyle: {
      marginTop: theme.spacing(3),
      borderRadius: '1.5rem',
      width: '7rem',
      height: '2rem',
      backgroundColor: theme.flexiCharge.accent.primary,
      color: theme.flexiCharge.primary.white,
      marginBottom: theme.spacing(3),
      border: 'none',
      fontFamily: theme.flexiCharge.font._main,
      '&:hover': {
        backgroundColor: theme.flexiCharge.accent.primary
      }
      
    },
    appBar: {
      backgroundColor: theme.flexiCharge.accent.primary,
      color: theme.flexiCharge.primary.white,
      marginBottom: theme.spacing(2),
      alignItems: 'center'
    },
    inputField: {
      marginTop: theme.spacing(1),
      fontFamily: theme.flexiCharge.font._main
    },
    alertBox: {
      width: '100%'
    },
    inputIcon: {
      color: theme.flexiCharge.primary.darkGrey
    },
    progressBarColor: {
      color: theme.flexiCharge.primary.black
    },
    loginTitle: {
      fontFamily: theme.flexiCharge.font.Lato,
      fontSize: '2em'
    }
  })
);

interface LoginFieldProps {
  setLoading: (isLoading: boolean) => void
}

const LoginFields: FC<LoginFieldProps> = ({ setLoading }) => {
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
      setLoading(true);
      const [wasSuccess, errors] = await authenticationProvider.login(username, password);
      if (wasSuccess) {
        setErrorState({});
      } else if (errors.invalidCredentials) {
        setErrorState({
          alertError: 'Invalid credentials'
        });
      }
      setLoading(false);
    } else {
      setErrorState({
        usernameError: !username ? 'Required' : undefined,
        passwordError: !password ? 'Required' : undefined
      });
    }
  };

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
            startAdornment: (
              <InputAdornment position="start">
                <Person className={classes.inputIcon} />
              </InputAdornment>
            )
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
            startAdornment: (
              <InputAdornment position="start">
                <Lock className={classes.inputIcon} />
              </InputAdornment>
            )
          }} />
        <Button onClick={handleSubmitClicked} className={classes.buttonStyle} variant="outlined">Login</Button>
      </form>
    </>
  );
};

const Login = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className="login-page">
        <div className="flexicharge-logo-title container row">
          <img className="col-3 col-md-2" src={backgroundLogo} alt="logo" />
          <img className="col-10 col-md-6" src={backgroundTitle} alt="title" />
        </div>
        <div className="login-form-wrapper col-10 col-md-6 col-lg-4 col-xl-3">
          {(isLoading) &&
            <LinearProgress className={classes.progressBarColor} />        
          }
          <Paper className={classes.loginPaper} elevation={7}>
            <AppBar className={classes.appBar} position="static">
              <Toolbar>
                <Typography className={classes.loginTitle} variant="h4">
                  Admin Portal
                </Typography>
              </Toolbar>
            </AppBar>
            <LoginFields setLoading={setIsLoading} />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Login;