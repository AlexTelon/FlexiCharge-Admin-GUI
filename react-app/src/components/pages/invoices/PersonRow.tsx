/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { ManageUser } from '@/remote-access/types';
import {
  Theme, useTheme, TableRow, TableCell, Box, Typography, Checkbox
} from '@material-ui/core';
import { FC } from 'react';

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
        <TableCell style={{ textDecoration: 'underline' }}>invoice-september.pdf</TableCell>
      </TableRow>
    </>
  );
};

export default PersonRow;