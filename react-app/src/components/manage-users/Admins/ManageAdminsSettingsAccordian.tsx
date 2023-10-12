import {
  Accordion, AccordionSummary, Grid, Typography,
  AccordionDetails, Divider, AccordionActions, Button, type Theme, useTheme
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { type FC, useState } from 'react';
import AddSingleAdminDialog from './AddAdminDialog';
import AddIcon from '@material-ui/icons/Add';
  
interface ManageAdminSettingsAccordianProps {
  selectedAdmins: readonly string[]
  [key: string]: any
}
  
const AdminSettingsAccordian: FC<ManageAdminSettingsAccordianProps> = ({ selectedAdmins, ...rest }) => {
  const theme: Theme = useTheme();
  const [openAddAdminDialog, setOpenAddAdminDialog] = useState<boolean>(false);
  const handleOpenAddAdminDialog = () => {
    setOpenAddAdminDialog(true);
  };
  const handleCloseAddAdminDialog = () => {
    setOpenAddAdminDialog(false);
  };
  
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="manage-admin-action-panel"
        id="manage-admin-actions-panel-header"
      >
        <Grid container id="manage-admin-actions-panel">
          <Grid item xs={9} md={10}>
            <Typography>
              {selectedAdmins.length} Selected
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
          startIcon={<AddIcon />} 
          variant="contained"  
          color='primary' 
          style={{ color: theme.flexiCharge.primary.white }}
          onClick={handleOpenAddAdminDialog}
        >
            Add Admin
        </Button>
      </AccordionActions>
      <AddSingleAdminDialog open={openAddAdminDialog} handleClose={handleCloseAddAdminDialog} {...rest} />
    </Accordion>
  );
};

export default AdminSettingsAccordian;