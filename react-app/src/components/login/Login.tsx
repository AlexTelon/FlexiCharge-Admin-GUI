import React from 'react';
import { Paper, makeStyles, createStyles, Theme, TextField, AppBar, Toolbar, Typography } from '@material-ui/core';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
// import backgroundImage from '../../assets/background.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: '#E5E5E5'
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
      background: '#128541',
      height: '5rem',
      width: '15rem'
    }
  })
);

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <img src={backgroundImage} alt="BackgroundImage" /> */}
      <Paper className={classes.loginPaper} elevation={10}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Hello world
            </Typography>
          </Toolbar>
        </AppBar>
        <TextField label="username" variant="outlined" />
        <TextField />
      </Paper>
    </div>
  );
};

export default Login;