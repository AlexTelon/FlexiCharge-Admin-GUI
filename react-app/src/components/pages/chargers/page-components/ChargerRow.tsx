import { Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography, IconButton, Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MoreHoriz, FiberManualRecord, Delete, Error } from '@material-ui/icons';
import React, { useState } from 'react';

export default function ChargerRow (props: any) {
  const theme: Theme = useTheme();

  const [openMore, setOpenMore] = useState(false);
  const handleOpenMore = () => {
    setOpenMore(true);
  };
  
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
              className={props.classes.stationNameCell}
              noWrap
            >
              {props.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell><Error color='error' />Offline</TableCell>
        <TableCell align='right'>
          <IconButton onClick={handleOpenMore}>
            <MoreHoriz />
          </IconButton>

          <Dialog open={openMore} onClose={handleCloseMore}>
            <DialogTitle>Edit charger {props.name}</DialogTitle>
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