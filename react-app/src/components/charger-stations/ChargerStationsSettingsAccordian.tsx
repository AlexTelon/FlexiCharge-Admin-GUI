import { Theme, Accordion, AccordionSummary, Grid, Typography, AccordionDetails, Divider, AccordionActions, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import React, { useState } from 'react';
import AddSingleStationDialog from './AddStationDialog';

const ChargerStationsSettingsAccordian = () => {
  const theme: Theme = useTheme();
  const [openAddStationDialog, setOpenAddStationDialog] = useState<boolean>(false);
  const handleOpenAddStationDialog = () => {
    setOpenAddStationDialog(true);
  };
  const handleCloseAddStationDialog = () => {
    setOpenAddStationDialog(false);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="charger-stations-actions-panel"
        id="charger-stations-actions-panel-header"
      >
        <Grid container id="charger-stations-actions-panel">
          <Grid item xs={9} md={10}>
            <Typography>
              0 Selected
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            More Actions
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          variant="contained"
          color="primary"
          style={{ color: theme.flexiCharge.primary.white }}
          onClick={handleOpenAddStationDialog}
        >
              Add Station
        </Button>
      </AccordionActions>

      <AddSingleStationDialog open={openAddStationDialog} handleClose={handleCloseAddStationDialog} />
    </Accordion>
  );
};

export default ChargerStationsSettingsAccordian;