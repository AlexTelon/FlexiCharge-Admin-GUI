import { manageChargerStation } from '@/remote-access';
import { ChargerStation } from '@/remote-access/types';
import {
  Accordion, AccordionActions, AccordionDetails,
  AccordionSummary, Button, Divider, Grid, ListItemText,
  Theme, Typography, useTheme
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FC, useEffect, useState } from 'react';
import AddChargerDialog from './AddChargerDialog';

interface ChargerStationAccordionProps {
  stationId: number
  reload: () => void
}

interface ChargerStationAccordianState {
  loaded: boolean
  station?: ChargerStation
  openAddStationDialog: boolean
}

const ChargerStationAccordian: FC<ChargerStationAccordionProps> = ({ stationId, reload }) => {
  const theme: Theme = useTheme();
  const [state, setState] = useState<ChargerStationAccordianState>({
    loaded: false,
    openAddStationDialog: false
  });

  const loadStation = () => {
    if (stationId) {
      manageChargerStation.getChargerStationById(stationId).then((chargerStation) => {
        if (chargerStation === null) return;
        setState({
          ...state,
          loaded: true,
          station: chargerStation
        });
      });
    }
  };

  useEffect(() => {
    loadStation();
  }, [stationId]);

  const handleOpenAddStationDialog = () => {
    setState({
      ...state,
      openAddStationDialog: true
    });
  };

  const handleCloseAddStationDialog = () => {
    setState({
      ...state,
      openAddStationDialog: false
    });
  };

  return (
    <>
      {state.station &&
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="charger-station-panel"
            id="charger-station-panel-header"
          >
            <Grid container id="charger-station-panel-header">
              <Grid item xs={9} md={10}>
                <Typography>
                  Viewing Chargers in Charger Station: {state.station.chargePointID}, {state.station?.name}
                </Typography>
              </Grid>
              <Grid item xs={3} md={2}>
                More Actions
              </Grid>
            </Grid>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Grid container spacing={5}>
              <Grid item xl={3}>
                <ListItemText
                  primary={state.station.chargePointID}
                  secondary="Station ID"
                />
              </Grid>
              <Grid item xl={3}>
                <ListItemText
                  primary={state.station.name}
                  secondary="Name"
                />
              </Grid>
              <Grid item xl={3}>
                <ListItemText
                  primary={`${state.station.location[0]}, ${state.station.location[1]}`}
                  secondary="Latitude, Longitude"
                />
              </Grid>
              <Grid item xl={3}>
                <ListItemText
                  primary={`SEK ${state.station.price / 100}`}
                  secondary="Price"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="primary"
              style={{ color: theme.flexiCharge.primary.white }}
              onClick={() => handleOpenAddStationDialog()}
            >
                Add Chargers
            </Button>
          </AccordionActions>

          <AddChargerDialog
            open={state.openAddStationDialog}
            handleClose={handleCloseAddStationDialog}
            station={state.station}
            reload={reload}
          />
        </Accordion>
      }
    </>
  );
};

export default ChargerStationAccordian;