/* eslint-disable react/react-in-jsx-scope */
import { manageChargerPoint } from '@/remote-access';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  createStyles,
  makeStyles,
  type Theme,
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

const chargingPointComp = (props: any) => {
  const classes = useStyles();
  const [numPoints, setNumPoints] = useState<number>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    manageChargerPoint.getAllChargerPoints().then((points) => {
      setNumPoints(points.length);
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
              Active Charge-points
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {numPoints}
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

export default chargingPointComp;