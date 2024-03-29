import {
  type Theme, Accordion, AccordionSummary, Grid, Typography,
  AccordionDetails, Divider, AccordionActions, Button
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import React, { type FC, useState } from 'react';
import AddSinglePointDialog from './AddChargerPointDialog';

interface ChargerPointSettingsAccordianProps {
  selectedChargerPoints: readonly string[]
  reload: any
};

const ChargerPointsSettingsAccordian: FC<ChargerPointSettingsAccordianProps> = ({ selectedChargerPoints, reload }) => {
  const theme: Theme = useTheme();
  const [openAddChargerPointDialog, setOpenAddChargerPointDialog] = useState<boolean>(false);
  const handleOpenAddChargerPointDialog = () => {
    setOpenAddChargerPointDialog(true);
  };
  const handleCloseAddChargerPointDialog = () => {
    setOpenAddChargerPointDialog(false);
    reload();
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="charger-points-actions-panel"
        id="charger-points-actions-panel-header"
      >
        <Grid container id="charger-points-actions-panel">
          <Grid item xs={9} md={10}>
            <Typography>
              {selectedChargerPoints.length} Selected
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
          onClick={handleOpenAddChargerPointDialog}
        >
              Add Charge-point
        </Button>
      </AccordionActions>

      <AddSinglePointDialog open={openAddChargerPointDialog} handleClose={handleCloseAddChargerPointDialog} />
    </Accordion>
  );
};

export default ChargerPointsSettingsAccordian;