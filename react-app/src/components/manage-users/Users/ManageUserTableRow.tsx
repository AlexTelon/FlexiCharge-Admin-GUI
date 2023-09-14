/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { FC } from 'react';
import { Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography, Button, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core';
import { Edit, LockOpen } from '@material-ui/icons';
import { User } from '@/remote-access/types';
import { manageUser } from '@/remote-access';

interface userRowProps {
  user: User
  editClicked: (username: string) => void
  selected: boolean
  handleSelect: (username: string) => void
}

const UserRow: FC<userRowProps> = ({ user, editClicked, selected, handleSelect }) => {
  const theme: Theme = useTheme();

  const created = user.created?.replace('T', ' ').replace('Z', '').split('.').at(0);
  
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
          {user.email}
        </TableCell>
        <TableCell>
          {user.username}
        </TableCell>
        <TableCell>
          {created}
        </TableCell>
        <TableCell align="right">
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