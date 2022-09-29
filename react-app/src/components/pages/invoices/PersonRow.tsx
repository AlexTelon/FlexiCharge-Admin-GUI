/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { ManageUser } from '@/remote-access/types';
import {
  Theme, useTheme, TableRow, TableCell, Box, Typography,
} from '@material-ui/core';
import { FC } from 'react';
// ignore below triggered error regarding imported invoice PDF
import pdf from './dummy invoice.pdf';

interface PersonRowProps {
  person: ManageUser
  classes: any
}

const PersonRow: FC<PersonRowProps> = ({ person, classes }) => {
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
              {person.username}
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
        <TableCell><a href={pdf} target="_blank" rel="noreferrer">View invoice</a></TableCell>
      </TableRow>
    </>
  );
};

export default PersonRow;