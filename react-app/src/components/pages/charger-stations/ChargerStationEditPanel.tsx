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
import { ChargerStation } from '@/remote-access/interfaces';

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
      color: theme.flexiCharge.accent.error
    }
  })
);

interface ChargerStationEditPanelProps {
  stationId?: string
}

const ChargerStationEditPanel: FC<ChargerStationEditPanelProps> = ({ stationId }) => {
  const classes = useStyle();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [station, setStation] = useState<ChargerStation>();
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [errorState, setErrorState] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // TODO: Refactor
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(Number(e.target.value));
  };
  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(Number(e.target.value));
  };

  useEffect(() => {
    if (stationId) {
      chargerStationCollection.getChargerStationById(stationId).then((chargerStation) => {
        if (chargerStation === null) return;
        setName(chargerStation.name);
        setAddress(chargerStation.address);
        setLatitude(chargerStation.latitude);
        setLongitude(chargerStation.longitude);
        setStation(chargerStation);
      });
    }
  }, [stationId]);

  const handleSaveClick = async () => {
    if (name && address && longitude && latitude && stationId) {
      setLoading(true);
      const result = await chargerStationCollection.updateChargerStation(stationId, { name, address, latitude, longitude });
      if (result[1] !== null) {
        console.log(result);
        setErrorState({
          ...result[0]
        });
        setLoading(false);
      } else if (result[0] !== null) {
        setStation(result[0]);
        setLoading(false);
      }
    } else {
      setErrorState({
        name: !name ? 'Required' : undefined,
        address: !address ? 'Required' : undefined,
        latitude: !latitude ? 'Required' : undefined,
        longitude: !longitude ? 'Required' : undefined
      });
    }
  };

  const handleCancleClick = () => {
    if (station) {
      setName(station.name);
      setAddress(station.address);
      setLatitude(station.latitude);
      setLongitude(station.longitude);
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
            <Box sx={{ px: 4 }}>
              <FormControl fullWidth variant="filled" error={errorState.name !== undefined}>
                <InputLabel htmlFor="station-name-input">Name</InputLabel>
                <Input
                  id="station-name-input"
                  aria-describedby="station-name-helper"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.address !== undefined}>
                <InputLabel htmlFor="station-address-input">Address</InputLabel>
                <Input
                  id="station-address-input"
                  aria-describedby="station-address-helper"
                  value={address}
                  onChange={handleAddressChange}
                />
                <FormHelperText id="station-address-helper">Street Address</FormHelperText>
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.longitude !== undefined}>
                <InputLabel htmlFor="station-longitude-input">Longitude</InputLabel>
                <Input
                  id="station-longitude-input"
                  aria-describedby="station-longitude-helper"
                  type="number"
                  value={longitude}
                  onChange={handleLongitudeChange}
                />
                <FormHelperText id="station-longitude-helper">Geographic Coordinate</FormHelperText>
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.latitude !== undefined}>
                <InputLabel htmlFor="station-latitude-input">Latitude</InputLabel>
                <Input
                  id="station-latitude-input"
                  aria-describedby="station-latitude-helper"
                  type="number"
                  value={latitude}
                  onChange={handleLatitudeChange} 
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
                      <Button onClick={handleDeleteDialogClose} className={classes.dialogDelete}>
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