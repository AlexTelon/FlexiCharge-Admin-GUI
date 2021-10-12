import React, { FC, useState } from 'react';
import { Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography, Hidden, Button, Collapse, Table, TableHead, TableBody } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { ChargerStation } from '@/remote-access/types';
import { Link } from 'react-router-dom';
interface ChargerStationTableRowProps {
  station: ChargerStation
  editClicked: (stationId: number) => void
  selected: boolean
  handleSelect: (stationId: number) => void
}

const ChargerStationTableRow: FC<ChargerStationTableRowProps> = ({ station, editClicked, selected, handleSelect }) => {
  const [open, setOpen] = useState(false);
  const theme: Theme = useTheme();
  return (
    <>
 
      <TableRow
        hover
        key={station.chargePointID}
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: open ? 'rgba(240,240,240,1)' : theme.flexiCharge.primary.white }}
      >
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={selected} onChange={() => { handleSelect(station.chargePointID); } } />
        </TableCell>
        <TableCell>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textPrimary"
              variant="body1"
              style={{ maxWidth: '15vw' }}
              noWrap
            >
              {station.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          {station.price}
        </TableCell>
        <TableCell align="right">
          <Hidden xsDown>
            <Button
              component={Link}
              to={`/dashboard/chargers/${station.chargePointID}`}
              variant="text"
              color="primary">
                Manage Chargers
            </Button>
          </Hidden>
          <Button
            startIcon={<Edit />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
            onClick={() => editClicked(station.chargePointID)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow
        key={station.chargePointID}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} >
              <Table size="small" aria-label="charger station details">
                <TableHead>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>Klarna Reservation Price</TableCell>
                    <TableCell>Longitude</TableCell>
                    <TableCell>Latitude</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{station.price}</TableCell>
                    <TableCell>{station.klarnaReservationAmount}</TableCell>
                    <TableCell>{station.location[0]}</TableCell>
                    <TableCell>{station.location[1]}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ChargerStationTableRow;