/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, 
  DialogActions, Button, makeStyles, createStyles, 
  LinearProgress, Fade, InputAdornment
} from '@material-ui/core';
import { CheckCircle, Close } from '@material-ui/icons';
import { manageChargerStation } from '@/remote-access';
import { Alert } from '@material-ui/lab';
import ChargerStationMap from '../dashboard/dashboardComponents/ChargerStationMap';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogClose: {
      float: 'right'
    },
    smallMap: {
      width: '100%',
      height: '350px',
    }
  })
);

const AddSingleStationDialog = ({ open, handleClose }: any) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [fields, setFields] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorState, setErrorState] = useState<any>({});
  const [inputMode, setInputMode] = useState('manual');

  const handleInputChange = (property: string, value: any) => {
    setFields({
      ...fields,
      [property]: value
    });
  };

  const handleCoordinateChange = (property: string, value: string) => {
    if (/^\d*\.?\d{0,10}$/.test(value) || value === '') {
      setFields({
        ...fields,
        [property]: value,
      });
    }
  };

  const handleMapClick = (lat: number, lon: number) => {
    setFields((prevFields: any) => ({
      ...prevFields,
      latitude: lat,
      longitude: lon
    }));
    console.log(lat, lon);
  };

  const cleanClose = () => {
    setFields({});
    setLoading(false);
    setSuccess(false);
    setErrorState({});
    handleClose();
  };

  useEffect(() => {
    console.log(`fields: ${JSON.stringify(fields)}`)
  }, [fields]);

  const handleSubmitClicked = async () => {
    const latitude = parseFloat(fields.latitude);
    const longitude = parseFloat(fields.longitude);

    const newErrorState = {
      name: !fields.name ? 'Required' : undefined,
      price: !fields.price ? 'Required' : undefined,
      latitude: !fields.latitude || isNaN(latitude) ? 'Required or Invalid' : undefined,
      longitude: !fields.longitude || isNaN(longitude) ? 'Required or Invalid' : undefined,
    };

    if (newErrorState.name || newErrorState.price || newErrorState.latitude || newErrorState.longitude) {
      setErrorState(newErrorState);
      return;
    }

    setLoading(true);

    try {
      const result = await manageChargerStation.addChargerStation({
        name: fields.name,
        location: [latitude, longitude],
        klarnaReservationAmount: 50000,
      });

      if (result[1] !== null) {
        setErrorState({
          ...result[1]
        });
        setLoading(false);
      } else {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          cleanClose();
        }, 450);
      }
    } catch (error) {
      console.error("Error while adding station: ", error);
      setErrorState({
        alert: "An unexpected error occurred while adding the station. Please try again later."
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={cleanClose}
        aria-labelledby="add-station-dialog-title"
        id="add-station-dialog"
      >
        {loading &&
          <LinearProgress />
        }

        {success &&
          <Fade in={true}>
            <Box
              style={{
                position: 'absolute',
                backgroundColor: theme.flexiCharge.accent.primary,
                zIndex: 9999,
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle style={{ color: theme.flexiCharge.primary.white, fontSize: 72 }} />
            </Box>
          </Fade>
        }

        <DialogTitle id="add-station-dialog-title">
          Add a Charger Station
          <IconButton
            onClick={cleanClose}
            className={classes.dialogClose}
            edge="end"
            aria-label="add station dialog close"
            aria-controls="add-station-dialog"
            color="inherit"
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {errorState.alert !== undefined &&
            <Alert style={{ width: '100%' }} severity="warning">{errorState.alert}</Alert>
          }
          <form>
            <Box sx={{ px: 2 }}>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.name !== undefined}>
                <FormHelperText id="station-name-helper">
                  {errorState.name
                    ? `${errorState.name} | Station Name`
                    : 'Station Name'
                  }
                </FormHelperText>
                <Input
                  id="station-name-input"
                  aria-describedby="station-name-helper"
                  onChange={(e) => { handleInputChange('name', e.target.value); }}
                  value={fields.name}
                />
              </FormControl>
              <FormControl style={{ marginTop: 18, marginBottom: 18 }} fullWidth variant="outlined" error={errorState.price !== undefined}>
                <ChargerStationMap
                  onMapClick={handleMapClick}
                  enableAddMarker={true}
                  fetchStations={false}
                  hideTitleAndLoading={true}
                  className={classes.smallMap}
                />
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.latitude !== undefined}>
                <FormHelperText id="station-latitude-helper">
                  {errorState.latitude
                    ? `${errorState.latitude} | Geographic Coordinate`
                    : 'Latitude'
                  }
                </FormHelperText>
                <Input
                  id="station-latitude-input"
                  aria-describedby="station-latitude-helper"
                  type="text"
                  onKeyPress={(e) => {
                    const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
                    if (!validChars.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => handleCoordinateChange('latitude', e.target.value)}
                  value={fields.latitude}
                />
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.longitude !== undefined}>
                <FormHelperText id="station-longitude-helper">
                  {errorState.longitude
                    ? `${errorState.longitude} | Geographic Coordinate`
                    : 'Longitude'
                  }
                </FormHelperText>
                <Input
                  id="station-longitude-input"
                  aria-describedby="station-longitude-helper"
                  type="text"
                  onKeyPress={(e) => {
                    const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
                    if (!validChars.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => handleCoordinateChange('longitude', e.target.value)}
                  value={fields.longitude}
                />
              </FormControl>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cleanClose} color="primary">
            Cancel
          </Button>
          <Button
            autoFocus
            style={{ color: 'white' }}
            onClick={handleSubmitClicked}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSingleStationDialog;