import React, { FC, useRef, useState } from 'react';
import {
  Theme, useTheme, TableRow, TableCell,
  Checkbox, Box, Typography, Hidden, Button,
  Collapse, Grid, ListItemText
} from '@material-ui/core';
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
  const stationRow = useRef(null);

  const theme: Theme = useTheme();
  return (
    <>
      <TableRow
        hover
        key={station.chargePointID}
        ref={stationRow}
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: open ? 'rgba(240,240,240,1)' : theme.flexiCharge.primary.white }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={selected}
            onChange={() => { handleSelect(station.chargePointID); } }
            onClick={(e) => e.stopPropagation()}
          />
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
            onClick={(e) => {
              e.stopPropagation();
              editClicked(station.chargePointID);
            }}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow
        key={`${station.chargePointID}-info`}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} >
              <Grid container spacing={5}>
                <Grid item xl={2}>
                  <ListItemText
                    primary={station.chargePointID}
                    secondary="Station ID"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={station.name}
                    secondary="Name"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={`${station.location[0]}, ${station.location[1]}`}
                    secondary="Latitude, Longitude"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={`SEK ${(station.klarnaReservationAmount ?? 0) / 100}`}
                    secondary="Klarna Reservation Amount"
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ChargerStationTableRow;