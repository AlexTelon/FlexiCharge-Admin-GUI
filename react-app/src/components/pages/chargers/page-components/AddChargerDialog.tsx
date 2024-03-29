import { manageCharger } from '@/remote-access';
import { type ChargePoint } from '@/remote-access/types';
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Input, InputLabel, LinearProgress, List, ListItem, ListItemText, type Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTheme } from '@material-ui/styles';
import React, { type FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AddChargerDialogProps {
  open: boolean
  handleClose: () => void
  chargePoint: ChargePoint
  reload: () => void
}

interface AddChargerDialogState {
  loading: boolean
  serialNumber?: string
  successfulAddedSerialNumber?: string
  errorState: {
    alert?: string
    serialNumber?: string
  }
}

const AddChargerDialog: FC<AddChargerDialogProps> = ({ open, handleClose, chargePoint, reload }) => {
  const theme: Theme = useTheme();
  const [state, setState] = useState<AddChargerDialogState>({
    loading: false,
    serialNumber: uuidv4(),
    errorState: {}
  });

  const handleSerialNumberChange = (newSerialNumber: string) => {
    setState({
      ...state,
      serialNumber: newSerialNumber
    });
  };

  useEffect(() => {
    if (open) {
      handleSerialNumberChange(uuidv4());
    }
  }, [open]);

  const handleAddClick = () => {
    if (state.serialNumber !== undefined) {
      setState({
        ...state,
        loading: true
      });

      manageCharger.addCharger({
        serialNumber: state.serialNumber,
        location: chargePoint.location,
        chargePointID: chargePoint.chargePointID
      }).then((result) => {
        if (result[1] !== null) {
          setState({
            ...state,
            errorState: {
              ...result[1],
              alert: result[1].error
            },
            loading: false
          });
        } else if (result[0]) {
          setState({
            ...state,
            errorState: {},
            successfulAddedSerialNumber: state.serialNumber,
            loading: false
          });
          reload();
        }
      });
    } else {
      setState({
        ...state,
        errorState: {
          serialNumber: 'Required'
        }
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => { setState({ loading: false, errorState: {} }); handleClose(); }}
      fullWidth
    >
      {state.loading &&
        <LinearProgress />
      }
      <Collapse in={state.successfulAddedSerialNumber !== undefined}>
        <Alert>
          Chager: {state.successfulAddedSerialNumber} Added
        </Alert>
      </Collapse>
      <DialogTitle>Add Chargers to a Charge-point</DialogTitle>
      {state.errorState.alert &&
        <Alert style={{ width: '100%' }} severity="warning">{state.errorState.alert}</Alert>
      }
      <DialogContent>
        <DialogContentText>
          Point Info for Charge-point {chargePoint.chargePointID}
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={chargePoint.name}
                secondary="Name"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${chargePoint.location[0]}, ${chargePoint.location[1]}`}
                secondary="Latitude, Longitude"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={state.serialNumber}
                secondary="Serial Number"
              />
            </ListItem>
            <ListItem>
              <ListItemText>
                The status of this charger will be set to <b>Available</b> by default.
              </ListItemText>
            </ListItem>
          </List>
        </DialogContentText>
        <form>
          <FormControl fullWidth variant="outlined" error={state.errorState.serialNumber !== undefined}>
            <InputLabel htmlFor="charger-serial-number">Charger Serial Number</InputLabel>
            <Input
              id="charger-serial-number"
              aria-describedby="charger-serial-number-helper"
              value={state.serialNumber}
              onChange={(e) => { handleSerialNumberChange(e.target.value); }}
            />
            <FormHelperText id="charger-serial-number-helper">
              {state.errorState.serialNumber
                ? `${state.errorState.serialNumber}`
                : 'Serial Number displayed on the Charger'
              }
            </FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="primary"
          onClick={() => { setState({ loading: false, errorState: {} }); handleClose(); }}
        >Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: theme.flexiCharge.accent.primary,
            color: theme.flexiCharge.primary.white
          }}
          onClick={() => { handleAddClick(); }}
        >Add Charger</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChargerDialog;