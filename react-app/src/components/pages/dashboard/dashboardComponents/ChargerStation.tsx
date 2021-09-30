/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';
import EvStationIcon from '@material-ui/icons/EvStation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.flexiCharge.primary.darkGrey
    }
  })
);

const chargingStationComp = (props: any) => {
  const classes = useStyles();
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
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
              12
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