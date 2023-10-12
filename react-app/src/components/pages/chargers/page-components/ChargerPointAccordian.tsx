import { manageChargerPoint } from '@/remote-access';
import { type ChargePoint } from '@/remote-access/types';
import {
  Accordion, AccordionActions, AccordionDetails,
  AccordionSummary, Button, Divider, Grid, ListItemText,
  type Theme, Typography, useTheme
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { type FC, useEffect, useState } from 'react';
import AddChargerDialog from './AddChargerDialog';

interface ChargerPointAccordionProps {
  chargePointId: number
  reload: () => void
}

interface ChargerPointAccordianState {
  loaded: boolean
  chargePoint?: ChargePoint
  openAddPointDialog: boolean
}

const ChargerPointAccordian: FC<ChargerPointAccordionProps> = ({ chargePointId, reload }) => {
  const theme: Theme = useTheme();
  const [state, setState] = useState<ChargerPointAccordianState>({
    loaded: false,
    openAddPointDialog: false
  });

  const loadPoint = () => {
    if (chargePointId) {
      manageChargerPoint.getChargerPointById(chargePointId).then((chargePoint) => {
        if (chargePoint === null) return;
        setState({
          ...state,
          loaded: true,
          chargePoint
        });
      });
    }
  };

  useEffect(() => {
    loadPoint();
  }, [chargePointId]);

  const handleOpenAddPointDialog = () => {
    setState({
      ...state,
      openAddPointDialog: true
    });
  };

  const handleCloseAddPointDialog = () => {
    setState({
      ...state,
      openAddPointDialog: false
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
                  Viewing Chargers in Charge-point: {state.chargePoint.chargePointID}, {state.chargePoint?.name}
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
                  secondary="Charge-point ID"
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
              onClick={() => { handleOpenAddPointDialog(); }}
            >
                Add Chargers
            </Button>
          </AccordionActions>

          <AddChargerDialog
            open={state.openAddPointDialog}
            handleClose={handleCloseAddPointDialog}
            chargePoint={state.chargePoint}
            reload={reload}
          />
        </Accordion>
      }
    </>
  );
};

export default ChargerPointAccordian;