/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { FC } from 'react';
import { Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography, Button, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core';
import { Edit, LockOpen } from '@material-ui/icons';
import { ManageUser } from '@/remote-access/types';
import { userCollection } from '@/remote-access';

interface userRowProps {
  user: ManageUser
  editClicked: (username: string) => void
  selected: boolean
  handleSelect: (username: string) => void
}

const UserRow: FC<userRowProps> = ({ user, editClicked, selected, handleSelect }) => {
  const theme: Theme = useTheme();

  const handleResetUserPassword = () => {
    userCollection.resetUserPassword(user?.email).then((wasSuccess) => {
      if (wasSuccess) {
        console.log('success');
      } else {
        console.log('failed');
      }
    }).catch((_: any) => {
      console.log('error');
    });
  };
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleYesClicked = () => {
    setOpen(false);
    handleResetUserPassword();
  };

  const handleNoClicked = () => {
    setOpen(false);
  };

  

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
            onClick={() => handleClickOpen()}
          >
            Reset Password
          </Button>

          <div>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleNoClicked}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Are you sure you want to reset this user's password?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  The password for this user is about to be reset. Proceed?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleNoClicked}>
                  No
                </Button>
                <Button onClick={handleYesClicked} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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