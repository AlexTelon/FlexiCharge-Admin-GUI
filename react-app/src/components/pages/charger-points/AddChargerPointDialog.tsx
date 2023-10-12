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
import { manageChargerPoint } from '@/remote-access';
import { Alert } from '@material-ui/lab';
import ChargerPointMap from '../dashboard/dashboardComponents/ChargePointMap';

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

const AddSinglePointDialog = ({ open, handleClose }: any) => {
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
      const result = await manageChargerPoint.addChargerPoint({
          name: fields.name,
          location: [latitude, longitude],
          klarnaReservationAmount: 50000,
          price: 0
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
      console.error("Error while adding point: ", error);
      setErrorState({
        alert: "An unexpected error occurred while adding the point. Please try again later."
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
        aria-labelledby="add-point-dialog-title"
        id="add-point-dialog"
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

        <DialogTitle id="add-charger-point-dialog-title">
          Add a Charge-point
          <IconButton
            onClick={cleanClose}
            className={classes.dialogClose}
            edge="end"
            aria-label="add charger point dialog close"
            aria-controls="add-charger-point-dialog"
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
                <FormHelperText id="point-name-helper">
                  {errorState.name
                    ? `${errorState.name} | Charge-point Name`
                    : 'Charge-point Name'
                  }
                </FormHelperText>
                <Input
                  id="point-name-input"
                  aria-describedby="point-name-helper"
                  onChange={(e) => { handleInputChange('name', e.target.value); }}
                  value={fields.name}
                />
              </FormControl>
              <FormControl style={{ marginTop: 18, marginBottom: 18 }} fullWidth variant="outlined" error={errorState.price !== undefined}>
                <FormHelperText id="point-price-helper">
                  {errorState.price
                    ? `${errorState.price} | Charge-point Price`
                    : 'Charge-point Price'
                  }
                </FormHelperText>
                <Input
                  id="point-price-input"
                  aria-describedby="point-price-helper"
                  type="number"
                  onChange={(e) => { handleInputChange('price', Number(e.target.value)); }}
                  value={fields.price}
                  startAdornment={ <InputAdornment position="start">SEK</InputAdornment> }
                />
              </FormControl>
              <ChargerPointMap
                onMapClick={handleMapClick}
                enableAddMarker={true}
                fetchChargePoints={false}
                hideTitleAndLoading={true}
                key={classes.smallMap}
              />
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.latitude !== undefined}>
                <FormHelperText id="point-latitude-helper">
                  {errorState.latitude
                    ? `${errorState.latitude} | Geographic Coordinate`
                    : 'Latitude'
                  }
                </FormHelperText>
                <Input
                  id="point-latitude-input"
                  aria-describedby="point-latitude-helper"
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
                <FormHelperText id="point-longitude-helper">
                  {errorState.longitude
                    ? `${errorState.longitude} | Geographic Coordinate`
                    : 'Longitude'
                  }
                </FormHelperText>
                <Input
                  id="point-longitude-input"
                  aria-describedby="point-longitude-helper"
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

export default AddSinglePointDialog;