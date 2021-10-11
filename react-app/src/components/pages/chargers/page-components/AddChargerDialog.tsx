import { ChargerStation } from '@/remote-access/types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Input, InputLabel, LinearProgress, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTheme } from '@material-ui/styles';
import React, { FC, useState } from 'react';

interface AddChargerDialogProps {
  open: boolean
  handleClose: () => void
  station: ChargerStation
}

interface AddChargerDialogState {
  loading: boolean
  serialNumber?: string
  errorState: {
    alert?: string
    serialNumber?: string
  }
}

const AddChargerDialog: FC<AddChargerDialogProps> = ({ open, handleClose, station }: any) => {
  const theme: Theme = useTheme();
  const [state, setState] = useState<AddChargerDialogState>({
    loading: false,
    errorState: {}
  });

  const handleSerialNumberChange = (newSerialNumber: string) => {
    setState({
      ...state,
      serialNumber: newSerialNumber
    });
  };

  const handleAddClick = () => {
    if (state.serialNumber === undefined) return;
    console.log(state.serialNumber);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {state.loading &&
        <LinearProgress />
      }
      <DialogTitle>Add Charger to Station</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ({station.chargePointID}), {station.name}
        </DialogContentText>
        {state.errorState.alert &&
          <Alert style={{ width: '100%' }} severity="warning">{state.errorState.alert}</Alert>
        }
        <form>
          <FormControl fullWidth variant="outlined" error={state.errorState.serialNumber !== undefined}>
            <InputLabel htmlFor="charger-serial-number">Serial Number</InputLabel>
            <Input
              id="charger-serial-number"
              aria-describedby="charger-serial-number-helper"
              value={state.serialNumber}
              onChange={(e) => handleSerialNumberChange(e.target.value)}
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
          onClick={handleClose}
        >Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: theme.flexiCharge.accent.primary,
            color: theme.flexiCharge.primary.white
          }}
          onClick={() => handleAddClick()}
        >Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChargerDialog;