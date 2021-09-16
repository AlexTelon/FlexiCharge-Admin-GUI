/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography
} from '@material-ui/core';
import EvStationIcon from '@material-ui/icons/EvStation';

const chargingStationComp = (props: any) => (
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
          <EvStationIcon />
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

export default chargingStationComp;