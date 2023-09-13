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
    const fetchMockData = async () => {
      const [mockUsers, mockError] = await manageUserCollection.getAllUsers();

      if (mockError || mockUsers === null) {
        const [remoteUsers, remoteError] = await userCollection.getAllUsers();

        if (remoteError || remoteUsers === null) {
          setNumUsers('N/A');
          setLoaded(true);
          return;
        }

        setNumUsers(`${remoteUsers.length}`);
        setLoaded(true);
      } else {
        setNumUsers(`${mockUsers.length}`);
        setLoaded(true);
      }
    };
  
    fetchMockData();
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