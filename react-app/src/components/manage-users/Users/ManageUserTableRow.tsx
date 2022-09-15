/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography, Button } from '@material-ui/core';
import { Edit, LockOpen } from '@material-ui/icons';
import { ManageUser } from '@/remote-access/types';

interface userRowProps {
  user: ManageUser
  editClicked: (username: string) => void
  selected: boolean
  handleSelect: (username: string) => void
}

const UserRow: FC<userRowProps> = ({ user, editClicked, selected, handleSelect }) => {
  const theme: Theme = useTheme();

  return (
    <>
      <TableRow 
        hover
        key={user.username}
        style={{ backgroundColor: theme.flexiCharge.primary.white }} 
      >
        <TableCell padding='checkbox'>
          <Checkbox color="primary" checked={selected} onChange={() => { handleSelect(user.username); } } />
        </TableCell>
        <TableCell>
          <Box 
            sx={{ 
              alignItems: 'center', 
              display: 'flex' 
            }}>
            <Typography
              color='textPrimary'
              variant='body1'
              style={{ maxWidth: '15vw' }}
              noWrap
            >
              {user.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          {user.email}
        </TableCell>
        <TableCell>
          {user.username}
        </TableCell>
        <TableCell>
          {user.created}
        </TableCell>
        <TableCell align="right">
        <Button
            startIcon={<LockOpen />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
            onClick={() => editClicked(user.username)}
          >
            {console.log(editClicked)}
            Reset Password
          </Button>
          <Button
            startIcon={<Edit />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
            onClick={() => editClicked(user.username)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;