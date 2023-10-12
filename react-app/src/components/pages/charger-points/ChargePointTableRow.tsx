import React, { FC, useRef, useState } from 'react';
import {
  Theme, useTheme, TableRow, TableCell,
  Checkbox, Box, Typography, Hidden, Button,
  Collapse, Grid, ListItemText
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { ChargePoint } from '@/remote-access/types';
import { Link } from 'react-router-dom';
interface ChargerPointTableRowProps {
  chargePoint: ChargePoint
  editClicked: (chargePointId: number) => void
  selected: boolean
  handleSelect: (chargePointId: number) => void
}

const ChargerPointTableRow: FC<ChargerPointTableRowProps> = ({ chargePoint, editClicked, selected, handleSelect }) => {
  const [open, setOpen] = useState(false);
  const chargePointRow = useRef(null);

  const theme: Theme = useTheme();
  return (
    <>
      <TableRow
        hover
        key={chargePoint.chargePointID}
        ref={chargePointRow}
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: open ? 'rgba(240,240,240,1)' : theme.flexiCharge.primary.white }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={selected}
            onChange={() => { handleSelect(chargePoint.chargePointID); } }
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
              {chargePoint.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Hidden xsDown>
            <Button
              component={Link}
              to={`/dashboard/chargers/${chargePoint.chargePointID}`}
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
              editClicked(chargePoint.chargePointID);
            }}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow
        key={`${chargePoint.chargePointID}-info`}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} >
              <Grid container spacing={5}>
                <Grid item xl={2}>
                  <ListItemText
                    primary={chargePoint.chargePointID}
                    secondary="chargePoint ID"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={chargePoint.name}
                    secondary="Name"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={`${chargePoint.location[0]}, ${chargePoint.location[1]}`}
                    secondary="Latitude, Longitude"
                  />
                </Grid>
                <Grid item xl={2}>
                  <ListItemText
                    primary={`SEK ${(chargePoint.klarnaReservationAmount ?? 0) / 100}`}
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