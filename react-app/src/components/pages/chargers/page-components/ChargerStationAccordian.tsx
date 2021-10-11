import { chargerStationCollection } from '@/remote-access';
import { ChargerStation } from '@/remote-access/types';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Divider, Grid, Theme, Typography, useTheme } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FC, useEffect, useState } from 'react';

interface ChargerStationAccordionProps {
  stationId: number
}

interface ChargerStationAccordianState {
  loaded: boolean
  station?: ChargerStation
}

const ChargerStationAccordian: FC<ChargerStationAccordionProps> = ({ stationId }) => {
  const theme: Theme = useTheme();
  const [state, setState] = useState<ChargerStationAccordianState>({
    loaded: false
  });

  const loadStation = () => {
    if (stationId) {
      chargerStationCollection.getChargerStationById(stationId).then((chargerStation) => {
        if (chargerStation === null) return;
        setState({
          loaded: true,
          station: chargerStation
        });
      });
    }
  };

  useEffect(() => {
    loadStation();
  }, [stationId]);

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
            <Typography variant="caption">
              {state.station?.chargePointID}
              <br />
              {state.station?.name}
              <br />
              {state.station.location}
              <br />
              {state.station.price}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              color="primary"
              style={{ color: theme.flexiCharge.primary.white }}
            >
                Add Charger
            </Button>
          </AccordionActions>
        </Accordion>
      }
    </>
  );
};

export default ChargerStationAccordian;