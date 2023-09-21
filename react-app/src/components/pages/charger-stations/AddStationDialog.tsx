/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogClose: {
      float: 'right'
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

  const handleInputChange = (property: string, value: any) => {
    setFields({
      ...fields,
      [property]: value
    });
  };

  const cleanClose = () => {
    setFields({});
    setLoading(false);
    setSuccess(false);
    setErrorState({});
    handleClose();
  };

  const handleSubmitClicked = async () => {
    if (fields.name && fields.price && fields.longitude && fields.latitude) {
      setLoading(true);
      const result = await manageChargerStation.addChargerStation({
        name: fields.name,
        location: [fields.latitude, fields.longitude],
        price: fields.price * 100,
        klarnaReservationAmount: 50000
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
    } else {
      setErrorState({
        name: !fields.name ? 'Required' : undefined,
        price: !fields.price ? 'Required' : undefined,
        latitude: !fields.latitude ? 'Required' : undefined,
        longitude: !fields.longitude ? 'Required' : undefined
      });
    }
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
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
            onClick={handleClose}
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
                <InputLabel htmlFor="station-name-input">Name</InputLabel>
                <Input
                  id="station-name-input"
                  aria-describedby="station-name-helper"
                  onChange={(e) => { handleInputChange('name', e.target.value); }}
                  value={fields.name}
                />
                {errorState.name &&
                  <FormHelperText id="station-price-helper">
                    {errorState.name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.price !== undefined}>
                <InputLabel htmlFor="station-price-input">Price</InputLabel>
                <Input
                  id="station-price-input"
                  aria-describedby="station-price-helper"
                  type="number"
                  onChange={(e) => { handleInputChange('price', Number(e.target.value)); }}
                  value={fields.price}
                  startAdornment={ <InputAdornment position="start">SEK</InputAdornment> }
                />
                <FormHelperText id="station-price-helper">
                  {errorState.price
                    ? `${errorState.price} | Station Price`
                    : 'Station Price'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.latitude !== undefined}>
                <InputLabel htmlFor="station-latitude-input">Latitude</InputLabel>
                <Input
                  id="station-latitude-input"
                  aria-describedby="station-latitude-helper"
                  type="number"
                  onChange={(e) => { handleInputChange('latitude', Number(e.target.value)); }}
                  value={fields.latitude}
                />
                <FormHelperText id="station-latitude-helper">
                  {errorState.latitude
                    ? `${errorState.latitude} | Geographic Coordinate`
                    : 'Geographic Coordinate'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.longitude !== undefined}>
                <InputLabel htmlFor="station-longitude-input">Longitude</InputLabel>
                <Input
                  id="station-longitude-input"
                  aria-describedby="station-longitude-helper"
                  type="number"
                  onChange={(e) => { handleInputChange('longitude', Number(e.target.value)); }}
                  value={fields.longitude}
                />
                <FormHelperText id="station-longitude-helper">
                  {errorState.longitude
                    ? `${errorState.longitude} | Geographic Coordinate`
                    : 'Geographic Coordinate'
                  }
                </FormHelperText>
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