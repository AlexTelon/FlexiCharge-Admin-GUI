/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { ManageUser } from '@/remote-access/types';
import { singletonUserList } from './InvoicesListSingleton';
import {
  Theme, useTheme, TableRow, TableCell, Box, Typography, Checkbox
} from '@material-ui/core';
import { FC } from 'react';

interface PersonRowProps {
  person: ManageUser
  classes: any
}

// let arr = [];

const PersonRow: FC<PersonRowProps> = ({ person, classes }) => {
  const theme: Theme = useTheme();

  const handleSelectedPerson = () => {
    if (!person) return;
    // arr.push(person);
    singletonUserList.addUser(person);
    console.log('added to array');
    console.log('LIST ', singletonUserList.logList());
    // console.log('persons to receive said invoice: ', arr);
  };

  return (
    <>
      <TableRow
        hover
        style={{ backgroundColor: theme.flexiCharge.primary.white }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onChange={() => { handleSelectedPerson() }}
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