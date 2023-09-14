/* eslint-disable react/react-in-jsx-scope */
import { manageCharger } from '@/remote-access';
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
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.flexiCharge.primary.darkGrey
    }
  })
);

const ChargingComp = (props: any) => {
  const classes = useStyles();
  const [numChargers, setNumChargers] = useState<number>(NaN);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    manageCharger.getAllChargers().then((result) => {
      if (result[0]) {
        setNumChargers(result[0].length);
      }
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
              Active Chargers
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {numChargers}
            </Typography>
          </Grid>
          <Grid item>
            <BatteryChargingFullIcon className={classes.icon} />
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

export default ChargingComp;