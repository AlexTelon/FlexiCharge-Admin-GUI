import {
  Paper, AppBar, Toolbar, Typography,
  IconButton, Divider, Box, Button, Theme, FormControl, InputLabel,
  Input, FormHelperText, Grid, useMediaQuery, Dialog, DialogTitle,
  DialogContent, DialogActions, LinearProgress
} from '@material-ui/core';
import { ChevronRight, Close } from '@material-ui/icons';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { manageChargerPoint } from '@/remote-access';
import { ChargePoint } from '@/remote-access/types';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';

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

interface ChargerPointEditPanelProps {
  chargePointId?: number
  setActiveChargerPointId: any
  reload: any
}

const ChargePointEditPanel: FC<ChargerPointEditPanelProps> = ({ chargePointId, setActiveChargerPointId, reload }) => {
  const classes = useStyle();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [point, setPoint] = useState<ChargePoint>();
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
    if (chargePointId) {
      manageChargerPoint.getChargerPointById(chargePointId).then((chargePoint) => {
        if (chargePoint === null) return;
        setFields({
          name: chargePoint.name,
          longitude: chargePoint.location[1],
          latitude: chargePoint.location[0]
        });
        setPoint(chargePoint);
      });
    }
  }, [chargePointId]);

  const handleSaveClick = async () => {
    if (fields.name && fields.price && fields.longitude && fields.latitude && chargePointId) {
      setLoading(true);
      const result = await manageChargerPoint.updateChargerPoint(chargePointId, {
        name: fields.name,
        location: [Number(fields.latitude), Number(fields.longitude)],
        klarnaReservationAmount: 500
      });
      if (result[1] !== null) {
        setErrorState({
          ...result[1]
        });
        setLoading(false);
      } else if (result[0] !== null) {
        setPoint(result[0]);
        setLoading(false);
        setErrorState({});
        reload();
      }
    } else {
      setErrorState({
        name: !fields.name ? 'Required' : undefined,
        latitude: !fields.latitude ? 'Required' : undefined,
        longitude: !fields.longitude ? 'Required' : undefined
      });
    }
  };

  const handleCancelClick = () => {
    if (point) {
      setFields({
        name: point.name,
        longitude: point.location[1],
        latitude: point.location[0]
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
    if (chargePointId) {
      setLoading(true);
      const wasSuccess = await manageChargerPoint.deleteChargerPoint(chargePointId);
      setLoading(false);
      if (!wasSuccess) {
        setErrorState({
          alert: 'Could not delete Charge-point'
        });
      } else {
        setActiveChargerPointId(undefined);
        reload();
      }
      setDeleteDialogOpen(false);
      chargePointId = 0;
    }
  };

  return (
    <Paper component="aside">
      {loading &&
        <LinearProgress />
      }
      {point && chargePointId && (
        <>
          <AppBar position="static" elevation={0} className={classes.panelAppBar}>
            <Toolbar variant="dense">
              <Typography className={classes.panelTitle} variant="h5">
                Charge-point Info
              </Typography>
              <IconButton
                aria-label="deselect charger"
                aria-controls="charger-info"
                color="inherit"
                onClick={() => setActiveChargerPointId(undefined) }
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
                <InputLabel htmlFor="point-name-input">Name</InputLabel>
                <Input
                  id="point-name-input"
                  aria-describedby="point-name-helper"
                  value={fields.name}
                  onChange={(e) => { handleInputChange('name', e.target.value); }}
                />
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="filled" error={errorState.latitude !== undefined}>
                <InputLabel htmlFor="point-latitude-input">Latitude</InputLabel>
                <Input
                  id="point-latitude-input"
                  aria-describedby="point-latitude-helper"
                  type="number"
                  value={fields.latitude}
                  onChange={(e) => { handleInputChange('latitude', e.target.value); }} 
                />
                <FormHelperText id="point-latitude-helper">Geographic Coordinate</FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="filled" error={errorState.longitude !== undefined}>
                <InputLabel htmlFor="point-longitude-input">Longitude</InputLabel>
                <Input
                  id="point-longitude-input"
                  aria-describedby="point-longitude-helper"
                  type="number"
                  value={fields.longitude}
                  onChange={(e) => { handleInputChange('longitude', e.target.value); }}
                />
                <FormHelperText id="point-longitude-helper">Geographic Coordinate</FormHelperText>
              </FormControl>
              <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
                <Button variant="contained" color="primary" className={classes.saveButton} onClick={handleSaveClick} >
                  Save
                </Button>
                <Button color="primary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
          <Divider />
          <Box sx={{ py: 2, px: 4 }}>
            <Button
              component={Link}
              to={`/dashboard/chargers/${point.chargePointID}`}
              variant="text"
              color="primary"
              fullWidth
              endIcon={<ChevronRight />}
            >
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
                  Delete this Charge-point
                  <br />
                  A deleted Charge-point is marked as Inactive
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
                  aria-labelledby="delete-charge-point-dialog"
                >
                  <Box>
                    <DialogTitle id="delete-charge-point-dialog">Are you sure?</DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete this Charge-point?
                      <br />
                      Deleting a Charge-point marks it as <em>Inactive</em> in the database
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

export default ChargePointEditPanel;