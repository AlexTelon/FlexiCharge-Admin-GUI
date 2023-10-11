import { type Charger } from '@/remote-access/types';
import {
  type Theme, useTheme, TableRow, TableCell, Box, Typography,
  Button
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { type FC } from 'react';

interface ChargerRowProps {
  editClicked: (connectorID: number) => void
  deleteClicked: (connectorID: number) => void
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
              {charger.connectorID}
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
            {charger.serialNumber}
          </Typography>
        </TableCell>
        <TableCell>{charger.chargePointID}</TableCell>
        <TableCell>{charger.status}</TableCell>
        <TableCell align='right'>
          <Button
            startIcon={<Edit />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
            onClick={() => { editClicked(charger.connectorID); }}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
export default ChargerRow;