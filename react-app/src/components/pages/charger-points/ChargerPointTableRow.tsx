import React, { FC, useRef, useState } from 'react';
import {
  Theme, useTheme, TableRow, TableCell,
  Checkbox, Box, Typography, Hidden, Button,
  Collapse, Grid, ListItemText
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { ChargerPoint } from '@/remote-access/types';
import { Link } from 'react-router-dom';
interface ChargerPointTableRowProps {
  chargerPoint: ChargerPoint
  editClicked: (chargerPointId: number) => void
  selected: boolean
  handleSelect: (chargerPointId: number) => void
}

const ChargerPointTableRow: FC<ChargerPointTableRowProps> = ({ chargerPoint, editClicked, selected, handleSelect }) => {
  const [open, setOpen] = useState(false);
  const chargerPointRow = useRef(null);

  const theme: Theme = useTheme();
  return (
    <>
      <TableRow
        hover
        key={chargerPoint.chargePointID}
        ref={chargerPointRow}
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: open ? 'rgba(240,240,240,1)' : theme.flexiCharge.primary.white }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={selected}
            onChange={() => { handleSelect(chargerPoint.chargePointID); } }
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
              {chargerPoint.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          SEK {chargerPoint.price / 100}
        </TableCell>
        <TableCell align="right">
          <Hidden xsDown>
            <Button
              component={Link}
              to={`/dashboard/chargers/${chargerPoint.chargePointID}`}
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
              editClicked(chargerPoint.chargePointID);
            }}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow
        key={`${chargerPoint.chargePointID}-info`}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} >
              <Grid container spacing={5}>
                <Grid item xl={2}>
                  <ListItemText
                    primary={chargerPoint.chargePointID}
                    secondary="chargerPoint ID"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={chargerPoint.name}
                    secondary="Name"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={`${chargerPoint.location[0]}, ${chargerPoint.location[1]}`}
                    secondary="Latitude, Longitude"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={`SEK ${chargerPoint.price / 100}`}
                    secondary="Price"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={`SEK ${(chargerPoint.klarnaReservationAmount ?? 0) / 100}`}
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

export default ChargerPointTableRow;