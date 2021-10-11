import { Charger } from '@/remote-access/types';
import {
  Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography,
  Button 
} from '@material-ui/core';
import { Error, Edit } from '@material-ui/icons';
import React, { FC } from 'react';

interface ChargerRowProps {
  editClicked: (chargerID: number) => void
  deleteClicked: (chargerID: number) => void
  charger: Charger
  classes: any
}

const ChargerRow: FC<ChargerRowProps> = ({ charger, classes, editClicked, deleteClicked }) => {
  const theme: Theme = useTheme();

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
        </TableCell>
      </TableRow>
    </>
  );
}; 

export default ChargerRow;