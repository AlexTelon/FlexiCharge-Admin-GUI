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
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.flexiCharge.primary.darkGrey
    }
  })
);

const ChargingComp = (props: any) => {
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
              Active Chargers
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              30
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