import { manageChargerPoint } from '@/remote-access';
import { ChargePoint } from '@/remote-access/types';
import {
  Accordion, AccordionActions, AccordionDetails,
  AccordionSummary, Button, Divider, Grid, ListItemText,
  Theme, Typography, useTheme
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FC, useEffect, useState } from 'react';
import AddChargerDialog from './AddChargerDialog';

interface ChargerPointAccordionProps {
  chargerPointId: number
  reload: () => void
}

interface ChargerPointAccordianState {
  loaded: boolean
  chargePoint?: ChargePoint
  openAddStationDialog: boolean
}

const ChargerPointAccordian: FC<ChargerPointAccordionProps> = ({ chargerPointId, reload }) => {
  const theme: Theme = useTheme();
  const [state, setState] = useState<ChargerPointAccordianState>({
    loaded: false,
    openAddStationDialog: false
  });

  const loadStation = () => {
    if (chargerPointId) {
      manageChargerPoint.getChargerPointById(chargerPointId).then((chargePoint) => {
        if (chargePoint === null) return;
        setState({
          ...state,
          loaded: true,
          chargePoint: chargePoint
        });
      });
    }
  };

  useEffect(() => {
    loadStation();
  }, [chargerPointId]);

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
      {state.chargePoint &&
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="charger-chargePoint-panel"
            id="charger-chargePoint-panel-header"
          >
            <Grid container id="charger-chargePoint-panel-header">
              <Grid item xs={9} md={10}>
                <Typography>
                  Viewing Chargers in Charger Point: {state.chargePoint.chargePointID}, {state.chargePoint?.name}
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
                  primary={state.chargePoint.chargePointID}
                  secondary="Charger Point ID"
                />
              </Grid>
              <Grid item xl={3}>
                <ListItemText
                  primary={state.chargePoint.name}
                  secondary="Name"
                />
              </Grid>
              <Grid item xl={3}>
                <ListItemText
                  primary={`${state.chargePoint.location[0]}, ${state.chargePoint.location[1]}`}
                  secondary="Latitude, Longitude"
                />
              </Grid>
              <Grid item xl={3}>
                <ListItemText
                  primary={`SEK ${state.chargePoint.price / 100}`}
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
            chargePoint={state.chargePoint}
            reload={reload}
          />
        </Accordion>
      }
    </>
  );
};

export default ChargerPointAccordian;