import {
  Accordion, AccordionSummary, Grid, Typography,
  AccordionDetails, Divider, AccordionActions, Button, Theme, useTheme
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import AddSingleUserDialog from './AddUserDialog';
import AddIcon from '@material-ui/icons/Add';

interface ManageUserSettingsAccordianProps {
  selectedUsers: readonly string[]
}

const UserSettingsAccordian: FC<ManageUserSettingsAccordianProps> = ({ selectedUsers }) => {
  const theme: Theme = useTheme();
  const [openAddUserDialog, setOpenAddUserDialog] = useState<boolean>(false);
  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };
  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="manage-user-action-panel"
        id="manage-user-actions-panel-header"
      >
        <Grid container id="manage-user-actions-panel">
          <Grid item xs={9} md={10}>
            <Typography>
              {selectedUsers.length} Selected
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
          onClick={handleOpenAddUserDialog}
        >
          Add User
        </Button>
      </AccordionActions>
      <AddSingleUserDialog open={openAddUserDialog} handleClose={handleCloseAddUserDialog} />
    </Accordion>
  );
};

export default UserSettingsAccordian;