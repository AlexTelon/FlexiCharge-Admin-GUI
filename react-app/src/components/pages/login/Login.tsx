/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, FC, useState } from 'react';
import {
  Paper, makeStyles, createStyles, Theme, AppBar, Toolbar,
  Typography, InputAdornment, TextField, Button, LinearProgress,
  Link
} from '@material-ui/core';
import { Redirect } from 'react-router';
import { Alert } from '@material-ui/lab';
import { Lock, Person } from '@material-ui/icons';
import { authenticationProvider } from '@/remote-access';
import backgroundLogo from '@/assets/logo.svg';
import backgroundTitle from '@/assets/title.svg';
import './Login.css';

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
    link: {
      color: theme.flexiCharge.accent.primary,
      fontWeight: 'bold'
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
  const [selectedForm, setSelectedForm] = React.useState('forms');
  const classes = useStyles();
  let [username, setUsername] = React.useState('');
  let [password, setPassword] = React.useState('');
  let [tempPassword, setTempPassword] = React.useState('');
  let [newPassword, setNewPassword] = React.useState('');
  let [verifyUsername, setVerifyUserame] = React.useState('');
  const [alertState, setAlertState] = useState<any>({});
  //const [successState, setSuccessState] = useState<any>({});

  const toggleForm = () => {
    if(selectedForm === 'login'){
      setSelectedForm('verify');
      resetTempPassword();
      resetNewPassword();
      resetVerifyUsername;

    } else {
      setSelectedForm('login')
    }
  };

  const [state, setState] = useState<any>({
    loaded: true,
  });
  
  useEffect(() => {
    setSelectedForm('login');
    setState({
      ...state,
    });
  }, []);

  const resetNewPassword = () => {
    setNewPassword(() => {
      return newPassword = ''
    })
  }
  const resetTempPassword = () => {
    setTempPassword(() => {
      return tempPassword = ''
    })
  }
  const resetVerifyUsername = () => {
    setUsername(() => {
      return verifyUsername = ''
    })
  }
  const handleLoginClicked = async () => {
    console.log('login clicked');
    if (username && password) {
      console.log(`username: ${username}, password: ${password}`)
      setLoading(true);
      const [wasSuccess, errors] = await authenticationProvider.login(username, password);
      if (wasSuccess) {
        console.log('success');
        setAlertState({});
        console.log(setAlertState);
      } else { 
        switch (true) {
          case errors.invalidCredentials: 
            setAlertState({
              alertError: 'Invalid credentials'
            });
            break;
          case errors.unauthorized:
            setAlertState({
              alertError: 'User has unathorized access'
            });
            break;
          case errors.notVerified: 
            setAlertState({
              alertError: 'User is not verified'
            });
            break;
          case errors.unknownError:
            setAlertState({
              alertError: 'An error occured, please try again later'
            });
            break;
          default:
            
            break;
        }
      }
      setLoading(false);
    } else {
      setAlertState({
        usernameError: !username ? 'Required' : undefined,
        passwordError: !password ? 'Required' : undefined
      });
    }
  };

  const handleVerifyClicked = async () => {
    if (verifyUsername && tempPassword && newPassword) {
      setLoading(true);
      const wasSuccess = await authenticationProvider.getAdminSession(verifyUsername, tempPassword, newPassword);
      if (wasSuccess) {
        setAlertState({
          alertVerifySuccess: 'Verified'
        });
      } else { 
        setAlertState({
          alertVerifyError: 'Invalid credentials'
        });
      }
    } 
    setLoading(false);
  };

  if (localStorage.getItem('isAuthenticated')) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  return (
    <>
      <form className="login-input-fields">
        
        {selectedForm === 'login' && alertState.alertError !== undefined &&
          <>
          <Alert className={classes.alertBox} severity="warning">{alertState.alertError}</Alert>
          </>
        }
        {selectedForm === 'verify' && alertState.alertVerifySuccess !== undefined &&
          <>
            <Alert className={classes.alertBox} severity="success">{alertState.alertVerifySuccess}</Alert>
          </>
        }
        {selectedForm === 'verify' && alertState.alertVerifyError !== undefined &&
          <>
            <Alert className={classes.alertBox} severity="warning">{alertState.alertVerifyError}</Alert>
          </>
        }
        {selectedForm === 'login' &&
        <>
          <TextField 
            className={classes.inputField}
            onChange={(e) => setUsername(e.target.value)}
            label="Email"
            size="small"
            data-cy="username-input"
            value={username}
            error={alertState.usernameError !== undefined}
            helperText={alertState.usernameError}
            variant="standard" InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className={classes.inputIcon} />
                </InputAdornment>
              )
            }} />
          <TextField
            className={classes.inputField}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            variant="standard"
            size="small"
            data-cy="password-input"
            value={password}
            error={alertState.passwordError !== undefined}
            helperText={alertState.passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={classes.inputIcon} />
                </InputAdornment>
              )
            }} />
          <Button onClick={handleLoginClicked} data-cy="login-btn" className={classes.buttonStyle} variant="outlined">Login</Button>
          <Typography>
            First time signing in? Verify account
            <Link 
            className={classes.link} 
            underline='none'
            href='#'
            onClick={() => toggleForm()}
            > Here</Link>
          </Typography>
          </>
        }
        {selectedForm === 'verify' &&
        <>
          <TextField 
            className={classes.inputField}
            onChange={(e) => setVerifyUserame(e.target.value)}
            label="Email"
            size="small"
            autoComplete="new-password"
            value={verifyUsername}
            error={alertState.usernameError !== undefined}
            helperText={alertState.usernameError}
            variant="standard" InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className={classes.inputIcon} />
                </InputAdornment>
              )
            }} />
          <TextField
            className={classes.inputField}
            onChange={(e) => setTempPassword(e.target.value)}
            label="Temporary password"
            type="password"
            variant="standard"
            size="small"
            autoComplete="new-password"
            value={tempPassword}
            error={alertState.passwordError !== undefined}
            helperText={alertState.passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={classes.inputIcon} />
                </InputAdornment>
              )
            }} />
            <TextField
            className={classes.inputField}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New password"
            type="password"
            variant="standard"
            size="small"
            autoComplete="new-password"
            value={newPassword}
            error={alertState.passwordError !== undefined}
            helperText={alertState.passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={classes.inputIcon} />
                </InputAdornment>
              )
            }} />
          <Button onClick={handleVerifyClicked} className={classes.buttonStyle} variant="outlined">Verify</Button>
          <Typography>
            Already verified? Sign in
            <Link 
            className={classes.link} 
            underline='none'
            href='#'
            onClick={() => toggleForm()}
            > Here</Link>
          </Typography>
          </>
        }
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