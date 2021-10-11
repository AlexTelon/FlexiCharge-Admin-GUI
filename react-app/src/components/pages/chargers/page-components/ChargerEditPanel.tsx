import { Charger } from '@/remote-access/types';
import { AppBar, Box, Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, LinearProgress, Paper, Theme, Toolbar, Typography } from '@material-ui/core';
import React, { FC, FormEvent, useEffect, useState } from 'react';
import { chargerCollection } from '@/remote-access';
import { useTheme } from '@material-ui/styles';
import { Close, Delete } from '@material-ui/icons';
import { Alert, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

interface ChargerEditPanelProps {
  chargerID: number
}

const ChargerEditPanel: FC<ChargerEditPanelProps> = ({ chargerID }) => {
  const theme: Theme = useTheme();
  const [charger, setCharger] = useState<Charger>();
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<any>({});
  const [availability, setAvailability] = useState<string>();

  const loadCharger = async () => {
    const [charger, error] = await chargerCollection.getChargerById(chargerID);
    if (error) {
      setErrorState({
        alert: 'lmao'
      });
    } else if (charger) {
      setCharger(charger);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCharger();
  }, []);

  const handleAvailabilityChange = (event: React.MouseEvent<HTMLElement>, newAvailability: string) => {
    setAvailability(newAvailability);
  };

  const [openDelete, setDeleteOpen] = useState(false);
  const handleDeleteClicked = () => {
    setDeleteOpen(true);
  }; 
  
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const onDeleteCharger = async (event: FormEvent<HTMLFormElement>, chargerId: number) => {
    event.preventDefault();
    const [res, error] = await chargerCollection.deleteChargerById(chargerId);
    console.log(res, error);
  };

  return (
    <>
      <Paper component="aside">
        {loading &&
          <LinearProgress />
        }
        {charger &&
          <>
            <AppBar
              position="static"
              elevation={0}
              style={{
                backgroundColor: theme.flexiCharge.primary.white,
                color: theme.flexiCharge.primary.darkGrey
              }}
            >
              <Toolbar variant="dense">
                <Typography style={{ flexGrow: 1 }} variant="h5">
                  Charger Info
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
              {errorState.alert &&
                <Alert severity="warning">{errorState.alert}</Alert>
              }
              <ToggleButtonGroup
                color="primary"
                value={availability}
                exclusive
                onChange={handleAvailabilityChange}
              >
                <ToggleButton value="ONLINE" style={{ borderColor: theme.flexiCharge.accent.primary }}>ONLINE</ToggleButton>
                <ToggleButton value="OFFLINE" style={{ borderColor: theme.flexiCharge.accent.error }}>OFFLINE</ToggleButton>
              </ToggleButtonGroup>
            </form>
            <Divider />
            <Box 
              sx={{ px: 4 }}
              borderTop={1}
              padding={2}
              borderColor="error.main"
            >
              <Button
                startIcon={<Delete />}
                style={{ color: theme.flexiCharge.primary.white }}
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteClicked()}
              >
                Delete
              </Button>
              <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Are you sure you want to delete charger {charger.chargerID}?</DialogTitle>
                <DialogActions>
                  <form onSubmit={(e) => { onDeleteCharger(e, charger.chargerID); }}>
                    <Button type="button" autoFocus onClick={handleCloseDelete}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" startIcon={<Delete />} >
                      Delete
                    </Button>
                  </form>
                </DialogActions>
              </Dialog>
            </Box>
          </>
        }
      </Paper>
    </>
  );
};

export default ChargerEditPanel;