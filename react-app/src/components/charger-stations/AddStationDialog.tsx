/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, DialogActions, Button, makeStyles, createStyles, LinearProgress, Fade
} from '@material-ui/core';
import { CheckCircle, Close } from '@material-ui/icons';
import { chargerStationCollection } from '../../remote-access';
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [errorState, setErrorState] = useState<any>({});

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

  const handleSubmitClicked = async () => {
    if (name && address && longitude && latitude) {
      setLoading(true);
      const result = await chargerStationCollection.addChargerStation({
        name,
        address,
        latitude,
        longitude
      });
      
      if (result[1] !== null) {
        console.log(result);
        setErrorState({
          ...result[1]
        });
        setLoading(false);
      } else {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          handleClose();
        }, 450);
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
                <Input id="station-name-input" aria-describedby="station-name-helper" onChange={handleNameChange} value={name} />
                {errorState.name &&
                  <FormHelperText id="station-address-helper">
                    {errorState.name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.address !== undefined}>
                <InputLabel htmlFor="station-address-input">Address</InputLabel>
                <Input id="station-address-input" aria-describedby="station-address-helper" onChange={handleAddressChange} value={address} />
                <FormHelperText id="station-address-helper">
                  {errorState.address
                    ? `${errorState.address} | Street Address`
                    : 'Street Address'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.longitude !== undefined}>
                <InputLabel htmlFor="station-longitude-input">Longitude</InputLabel>
                <Input id="station-longitude-input" aria-describedby="station-longitude-helper" type="number" onChange={handleLongitudeChange} value={longitude} />
                <FormHelperText id="station-longitude-helper">
                  {errorState.longitude
                    ? `${errorState.longitude} | Geographic Coordinate`
                    : 'Geographic Coordinate'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.latitude !== undefined}>
                <InputLabel htmlFor="station-latitude-input">Latitude</InputLabel>
                <Input id="station-latitude-input" aria-describedby="station-latitude-helper" type="number" onChange={handleLatitudeChange} value={latitude} />
                <FormHelperText id="station-latitude-helper">
                  {errorState.latitude
                    ? `${errorState.latitude} | Geographic Coordinate`
                    : 'Geographic Coordinate'
                  }
                </FormHelperText>
              </FormControl>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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