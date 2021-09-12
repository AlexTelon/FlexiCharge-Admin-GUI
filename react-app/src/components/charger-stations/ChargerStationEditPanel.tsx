import {
  Paper, AppBar, Toolbar, Typography,
  IconButton, Divider, Box, Button, Theme, FormControl, InputLabel, Input, FormHelperText, Grid
} from '@material-ui/core';
import { ChevronRight, Close } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyle = makeStyles((theme: Theme) => 
  createStyles({
    panelTitle: {
      flexGrow: 1
    },
    panelAppBar: {
      backgroundColor: theme.flexiCharge.primary.white,
      color: theme.flexiCharge.primary.darkGrey
    },
    saveButton: {
      color: theme.flexiCharge.primary.white
    },
    deleteButton: {
      backgroundColor: theme.flexiCharge.accent.error,
      color: theme.flexiCharge.primary.white,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    }
  })
);

const ChargerStationEditPanel = () => {
  const classes = useStyle();
  return (
    <Paper component="aside">
      <AppBar position="static" elevation={0} className={classes.panelAppBar}>
        <Toolbar variant="dense">
          <Typography className={classes.panelTitle} variant="h5">
            Station Info
          </Typography>
          <IconButton
            aria-label="deselect charger"
            aria-controls="charger-info"
            color="inherit"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <form>
        <Box sx={{ px: 4 }}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="station-name-input">Name</InputLabel>
            <Input id="station-name-input" aria-describedby="station-name-helper" />
          </FormControl>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="station-longitude-input">Longitude</InputLabel>
            <Input id="station-longitude-input" aria-describedby="station-longitude-helper" type="number" />
            <FormHelperText id="station-longitude-helper">Geographic Coordinate</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="station-latitude-input">Latitude</InputLabel>
            <Input id="station-latitude-input" aria-describedby="station-latitude-helper" type="number" />
            <FormHelperText id="station-latitude-helper">Geographic Coordinate</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="station-address-input">Address</InputLabel>
            <Input id="station-address-input" aria-describedby="station-address-helper" />
            <FormHelperText id="station-address-helper">Street Address</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="station-town-input">Town</InputLabel>
            <Input id="station-town-input" aria-describedby="station-town-helper" type="number" />
          </FormControl>
          <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
            <Button variant="contained" color="primary" className={classes.saveButton}>
              Save
            </Button>
            <Button color="primary">
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
      <Divider />
      <Box sx={{ py: 2, px: 4 }}>
        <Button fullWidth color="primary" endIcon={<ChevronRight />}>
            Manage Chargers
        </Button>
      </Box>
      <Divider />
      <Box 
        sx={{ px: 4 }}
        borderTop={1}
        borderColor="error.main"
      >
        <Grid container>
          <Grid item lg={8}>
            <Typography variant="caption">
              Delete this Station
              <br />
              A deleted station is marked as Inactive
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Button fullWidth variant="contained" className={classes.deleteButton}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ChargerStationEditPanel;