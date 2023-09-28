/* eslint-disable react/react-in-jsx-scope */
import { manageChargerStation } from '@/remote-access';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  LinearProgress
} from '@material-ui/core';
import EvStationIcon from '@material-ui/icons/EvStation';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.flexiCharge.primary.darkGrey
    }
  })
);

const chargingStationComp = (props: any) => {
  const classes = useStyles();
  const [numStations, setNumStations] = useState<number>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    manageChargerStation.getAllChargerStations().then((stations) => {
      setNumStations(stations.length);
      setLoaded(true);
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
              Active Charger Stations
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {numStations}
            </Typography>
          </Grid>
          <Grid item>
            <EvStationIcon className={classes.icon} />
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

export default chargingStationComp;