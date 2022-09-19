/* eslint-disable */ 
/* eslint-disable react/jsx-no-undef */

import { ManageUser } from '@/remote-access/types';
import {
  Theme, useTheme, TableRow, TableCell, Box, Typography,
  Button 
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { FC } from 'react';

interface ChargerRowProps {
/*  editClicked: (chargerID: number) => void
  deleteClicked: (chargerID: number) => void
  charger: Charger
  classes: any
  */
  person: ManageUser
}

const ChargerRow: FC<ChargerRowProps> = ({person}) => {
  const theme: Theme = useTheme();


  return (
    <>
      <TableRow
        hover
        style={{ backgroundColor: theme.flexiCharge.primary.white }}
      >
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
              noWrap
            >
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography
            color="textPrimary"
            variant="body1"
            style={{ maxWidth: '15vw' }}
            noWrap
          >
            {person.name}
          </Typography>
        </TableCell>
        <TableCell>{person.username}</TableCell>
        <TableCell>{person.username}</TableCell>
        <TableCell align='right'>
          <Button
            startIcon={<Edit />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}; 

export default ChargerRow;