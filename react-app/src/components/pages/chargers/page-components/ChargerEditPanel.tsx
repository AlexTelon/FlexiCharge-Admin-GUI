import { type Charger } from '@/remote-access/types';
import { AppBar, Box, Button, Dialog, DialogActions, DialogTitle, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemText, Paper, type Theme, Toolbar, Typography } from '@material-ui/core';
import React, { type FC, type FormEvent, useEffect, useState } from 'react';
import { manageCharger } from '@/remote-access';
import { useTheme } from '@material-ui/styles';
import { Close, Delete } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

interface ChargerEditPanelProps {
  connectorID: number
  setActiveconnectorID: (connectorID: number | undefined) => void
  reload: () => void
}

const ChargerEditPanel: FC<ChargerEditPanelProps> = ({ connectorID, setActiveconnectorID, reload }) => {
  const theme: Theme = useTheme();
  const [charger, setCharger] = useState<Charger>();
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<any>({});

  const loadCharger = async () => {
    const [charger, error] = await manageCharger.getChargerById(connectorID);
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
  }, [connectorID]);

  const [openDelete, setDeleteOpen] = useState(false);
  const handleDeleteClicked = () => {
    setDeleteOpen(true);
  }; 
  
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const onDeleteCharger = async (event: FormEvent<HTMLFormElement>, connectorID: number) => {
    event.preventDefault();
    await manageCharger.deleteChargerById(connectorID);
    setActiveconnectorID(undefined);
    reload();
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
                  onClick={() => setActiveconnectorID(undefined)}
                >
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Divider />
            <List dense={true}>
              {errorState.alert &&
                <Alert severity="warning">{errorState.alert}</Alert>
              }
              <ListItem>
                <ListItemText
                  primary={charger.connectorID}
                  secondary="Connector ID"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={charger.serialNumber}
                  secondary="Serial Number"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={charger.chargePointID}
                  secondary="Charger Station ID"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={charger.status}
                  secondary="Status"
                />
              </ListItem>
            </List>
            <Divider />
            <Box 
              sx={{ px: 4 }}
              borderTop={1}
              padding={2}
              borderColor="error.main"
            >
              <Grid container>
                <Grid item lg={8}>
                  <Typography variant="caption">
                    Delete this Charger
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    startIcon={<Delete />}
                    variant="contained"
                    style={{
                      backgroundColor: theme.flexiCharge.accent.error,
                      color: theme.flexiCharge.primary.white
                    }}
                    onClick={() => { handleDeleteClicked(); }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
              <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Are you sure you want to delete charger {charger.connectorID}?</DialogTitle>
                <DialogActions>
                  <form onSubmit={(e) => { onDeleteCharger(e, charger.connectorID); }}>
                    <Button type="button" autoFocus onClick={handleCloseDelete}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: theme.flexiCharge.accent.error,
                        color: theme.flexiCharge.primary.white
                      }}
                      startIcon={<Delete />} >
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