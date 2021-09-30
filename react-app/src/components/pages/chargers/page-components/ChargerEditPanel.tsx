import { Charger } from '@/remote-access/types';
import { AppBar, Box, Button, Divider, Grid, IconButton, LinearProgress, Paper, Theme, Toolbar, Typography } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { chargerCollection } from '@/remote-access';
import { useTheme } from '@material-ui/styles';
import { Close } from '@material-ui/icons';
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
                  Station Info
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
              borderColor="error.main"
            >
              <Grid container>
                <Grid item lg={8}>
                  <Typography variant="caption">
                    Delete this Station
                    <br />
                    A deleted station is marked as Inactive
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button fullWidth variant="contained">
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        }
      </Paper>
    </>
  );
};

export default ChargerEditPanel;