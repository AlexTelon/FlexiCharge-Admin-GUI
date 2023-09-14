import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, LinearProgress, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { userCollection, manageUserCollection } from '@/remote-access';
import { People } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.flexiCharge.primary.darkGrey
    }
  })
);

const UsersDashboardComponent = (props: any) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [numUsers, setNumUsers] = useState<string>();

  useEffect(() => {
    userCollection.getAllUsers().then((result) => {
      if (result[1] || result[0] === null) {
        setNumUsers('N/A');
        manageUserCollection.getAllUsers().then((mockResult) => {
          if (mockResult[1] || mockResult[0] === null) {
            setNumUsers('N/A');
          } else {
            setNumUsers(`${mockResult[0].length}`);
          }
          setLoaded(true);
        });
      } else {
        setNumUsers(`${result[0].length}`);
        setLoaded(true);
      }
    });
  }, []);

  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      {!loaded && 
        <LinearProgress />
      }
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Users
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {numUsers}
            </Typography>
          </Grid>
          <Grid item>
            <People className={classes.icon} />
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
              Current
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UsersDashboardComponent;