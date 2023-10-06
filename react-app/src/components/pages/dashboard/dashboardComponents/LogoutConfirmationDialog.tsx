import React from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, DialogContent,
  DialogActions, Button
} from '@material-ui/core';

const LogoutConfirmationDialog = ({ handleLogout, handleClose, open }: any) => {
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="logout-confirmation-dialog-title"
      PaperProps={{
        style: {
          width: '100%'
        }
      }}
    >
      <DialogTitle id="logout-confirmation-dialog-title">Confirm Logout</DialogTitle>
      <DialogContent>
        Are you sure you want to logout?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          style={{ color: 'white' }}
          onClick={() => {
            handleLogout();
            handleClose();
          }}
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmationDialog;