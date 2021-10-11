import { Charger } from '@/remote-access/types';
import {
  Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography,
  Dialog, DialogTitle, Button
} from '@material-ui/core';
import { Delete, Error, Edit } from '@material-ui/icons';
import { chargerCollection } from '@/remote-access';
import React, { FC, FormEvent, useState } from 'react';

interface ChargerRowProps {
  editClicked: (chargerID: number) => void
  deleteClicked: (chargerID: number) => void
  charger: Charger
  classes: any
}

const ChargerRow: FC<ChargerRowProps> = ({ charger, classes, editClicked, deleteClicked }) => {
  const theme: Theme = useTheme();

  const [openDelete, setDeleteOpen] = useState(false);
  const handleDeleteClicked = () => {
    setDeleteOpen(true);
  }; 
  
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const onDeleteCharger = async (event: FormEvent<HTMLFormElement>, chargerId: number) => {
    event.preventDefault();
    const [res, error] = await chargerCollection.deleteChargerById(chargerId);
    console.log(res, error);
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
          <Button
            startIcon={<Delete />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClicked()}
          >
            Delete
          </Button>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>Are you sure you want to delete charger {charger.chargerID}?</DialogTitle>
            <form onSubmit={(e) => { onDeleteCharger(e, charger.chargerID); }}>
              <Button type="submit" variant="contained" color="primary" className={classes.saveButton}>
                Yes
              </Button>
              <Button type="button" onClick={handleCloseDelete}>No</Button>
            </form>
          </Dialog>
        </TableCell>
      </TableRow>
    </>
  );
}; 

export default ChargerRow;