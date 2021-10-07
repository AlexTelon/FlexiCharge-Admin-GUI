import {
  Paper, AppBar, Toolbar, Typography,
  IconButton, Divider, Box, Button, Theme, FormControl, InputLabel,
  Input, FormHelperText, Grid, useMediaQuery, Dialog, DialogTitle,
  DialogContent, DialogActions, LinearProgress
} from '@material-ui/core';
import { ChevronRight, Close } from '@material-ui/icons';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { chargerStationCollection } from '@/remote-access';
import { ChargerStation } from '@/remote-access/types';
import { Alert } from '@material-ui/lab';

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
    },
    dialogDelete: {
      color: theme.flexiCharge.primary.white,
      backgroundColor: theme.flexiCharge.accent.error
    }
  })
);

interface ChargerStationEditPanelProps {
  stationId?: number
}

const ChargerStationEditPanel: FC<ChargerStationEditPanelProps> = ({ stationId }) => {
  const classes = useStyle();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [station, setStation] = useState<ChargerStation>();
  const [fields, setFields] = useState<any>();
  const [errorState, setErrorState] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (property: string, value: any) => {
    setFields({
      ...fields,
      [property]: value
    });
  };

  useEffect(() => {
    if (stationId) {
      chargerStationCollection.getChargerStationById(stationId).then((chargerStation) => {
        if (chargerStation === null) return;
        setFields({
          name: chargerStation.name,
          longitude: chargerStation.location[0],
          latitude: chargerStation.location[1],
          price: chargerStation.price
        });
        setStation(chargerStation);
      });
    }
  }, [stationId]);

  const handleSaveClick = async () => {
    if (fields.name && fields.price && fields.longitude && fields.latitude && stationId) {
      setLoading(true);
      const result = await chargerStationCollection.updateChargerStation(stationId, {
        name: fields.name,
        location: [Number(fields.longitude), Number(fields.latitude)],
        price: Number(fields.price),
        klarnaReservationAmount: 500
      });
      if (result[1] !== null) {
        console.log(result);
        setErrorState({
          ...result[1]
        });
        setLoading(false);
      } else if (result[0] !== null) {
        setStation(result[0]);
        setLoading(false);
        setErrorState({});
      }
    } else {
      setErrorState({
        name: !fields.name ? 'Required' : undefined,
        price: !fields.price ? 'Required' : undefined,
        latitude: !fields.latitude ? 'Required' : undefined,
        longitude: !fields.longitude ? 'Required' : undefined
      });
    }
  };

  const handleCancleClick = () => {
    if (station) {
      setFields({
        name: station.name,
        longitude: station.location[0],
        latitude: station.location[1]
      });
    }
  };

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (stationId) {
      setLoading(true);
      const wasSuccess = await chargerStationCollection.deleteChargerStation(stationId);
      setLoading(false);
      if (!wasSuccess) {
        setErrorState({
          alert: 'Could not delete Charger Station'
        });
      }
      setDeleteDialogOpen(false);
      stationId = 0;
    }
  };

  return (
    <Paper component="aside">
      {loading &&
        <LinearProgress />
      }
      {station && (
        <>
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
            {errorState.alert &&
              <Alert severity="warning">{errorState.alert}</Alert>
            }
            <Box sx={{ px: 4 }}>
              <FormControl fullWidth variant="filled" error={errorState.name !== undefined}>
                <InputLabel htmlFor="station-name-input">Name</InputLabel>
                <Input
                  id="station-name-input"
                  aria-describedby="station-name-helper"
                  value={fields.name}
                  onChange={(e) => { handleInputChange('name', e.target.value); }}
                />
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.price !== undefined}>
                <InputLabel htmlFor="station-price-input">Price</InputLabel>
                <Input
                  id="station-price-input"
                  aria-describedby="station-price-helper"
                  value={fields.price}
                  type="number"
                  onChange={(e) => { handleInputChange('price', e.target.value); }}
                />
                <FormHelperText id="station-price-helper">Station Price</FormHelperText>
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.longitude !== undefined}>
                <InputLabel htmlFor="station-longitude-input">Longitude</InputLabel>
                <Input
                  id="station-longitude-input"
                  aria-describedby="station-longitude-helper"
                  type="number"
                  value={fields.longitude}
                  onChange={(e) => { handleInputChange('longitude', e.target.value); }}
                />
                <FormHelperText id="station-longitude-helper">Geographic Coordinate</FormHelperText>
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.latitude !== undefined}>
                <InputLabel htmlFor="station-latitude-input">Latitude</InputLabel>
                <Input
                  id="station-latitude-input"
                  aria-describedby="station-latitude-helper"
                  type="number"
                  value={fields.latitude}
                  onChange={(e) => { handleInputChange('latitude', e.target.value); }} 
                />
                <FormHelperText id="station-latitude-helper">Geographic Coordinate</FormHelperText>
              </FormControl>
              <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
                <Button variant="contained" color="primary" className={classes.saveButton} onClick={handleSaveClick} >
                  Save
                </Button>
                <Button color="primary" onClick={handleCancleClick}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
          <Divider />
          <Box sx={{ py: 2, px: 4 }}>
            <Button fullWidth color="primary" endIcon={<ChevronRight />} disabled>
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
                <Button fullWidth variant="contained" className={classes.deleteButton} onClick={handleDeleteDialogOpen}>
                  Delete
                </Button>
                <Dialog
                  fullScreen={fullScreen}
                  open={deleteDialogOpen}
                  onClose={handleDeleteDialogClose}
                  aria-labelledby="delete-station-dialog"
                >
                  <Box>
                    <DialogTitle id="delelte-station-dialog">Are you sure?</DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete this Charger Station?
                      <br />
                      Deleting a Charger Station marks it as <em>Inactive</em> in the database
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleDelete} variant="contained" className={classes.dialogDelete} >
                        Delete
                      </Button>
                    </DialogActions>
                  </Box>
                </Dialog>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ChargerStationEditPanel;