import React from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, DialogActions, Button, makeStyles, createStyles
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-station-dialog-title"
        id="add-station-dialog"
      >
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
          <form>
            <Box sx={{ px: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="station-name-input">Name</InputLabel>
                <Input id="station-name-input" aria-describedby="station-name-helper" />
              </FormControl>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="station-address-input">Address</InputLabel>
                <Input id="station-address-input" aria-describedby="station-address-helper" />
                <FormHelperText id="station-address-helper">Street Address</FormHelperText>
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
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSingleStationDialog;