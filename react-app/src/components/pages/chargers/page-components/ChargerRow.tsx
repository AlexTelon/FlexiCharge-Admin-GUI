import { Charger } from '@/remote-access/types';
import {
  Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography,
  Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText, Button
} from '@material-ui/core';
import { FiberManualRecord, Delete, Error, Edit } from '@material-ui/icons';
import React, { FC, useState } from 'react';

interface ChargerRowProps {
  editClicked: (chargerID: number) => void
  charger: Charger
  classes: any
}

const ChargerRow: FC<ChargerRowProps> = ({ charger, classes, editClicked }) => {
  const theme: Theme = useTheme();

  const [openMore, setOpenMore] = useState(false);
  /* const handleOpenMore = () => {
    setOpenMore(true);
  }; */
  
  const handleCloseMore = () => {
    setOpenMore(false);
  };

  return (
    <>
      <TableRow
        hover
        style={{ backgroundColor: theme.flexiCharge.primary.white }}
      >
        <TableCell padding='checkbox'>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color='textPrimary'
              variant='body1'
              className={classes.stationNameCell}
              noWrap
            >
              {charger.chargerID}
            </Typography>
          </Box>
        </TableCell>
        <TableCell><Error color='error' />Offline</TableCell>
        <TableCell align='right'>
          <Button
            startIcon={<Edit />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
            onClick={() => editClicked(charger.chargerID)}
          >
            Edit
          </Button>
          {/* <IconButton onClick={handleOpenMore}>
            <MoreVert />
          </IconButton> */}

          <Dialog open={openMore} onClose={handleCloseMore}>
            <DialogTitle>Edit charger {charger.chargerID}</DialogTitle>
            <List aria-label="charger options">
              <ListItem button>
                <ListItemIcon>
                  <Error />
                </ListItemIcon>
                <ListItemText primary="Set to offline" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FiberManualRecord />
                </ListItemIcon>
                <ListItemText primary="Set to online" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItem>
            </List>
          </Dialog>
        </TableCell>
      </TableRow>
    </>
  );
}; 

export default ChargerRow;