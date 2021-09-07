import React from 'react';
import { Paper, makeStyles, createStyles, Theme } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: '#ffffff'
    }
  })
);

const Login = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.appBar} elevation={3} />
  );
};

export default Login;