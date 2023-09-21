/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, Input, InputLabel, LinearProgress, Paper, Theme, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { manageUser } from '../../../remote-access';
import { User } from '@/remote-access/types';

const useStyle = makeStyles((theme: Theme) => 

  createStyles({
    panelTitle: {
      flexGrow: 1
    },
    panelAppBar: {
      backgroundColor: theme.flexiCharge.primary.white,
      color: theme.flexiCharge.primary.darkGrey
    },
    saveButton: {
      color: theme.flexiCharge.primary.white
    },
    deleteButton: {
      backgroundColor: theme.flexiCharge.accent.error,
      color: theme.flexiCharge.primary.white,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    dialogDelete: {
      color: theme.flexiCharge.accent.error
    }
  })
);

interface ManageUsersEditPanelProps {
  userId?: string
}

const ManageUsersEditPanel: FC<ManageUsersEditPanelProps> = ({ userId }) => {
  const classes = useStyle();
  const [user, setUser] = useState<User>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [errorState, setErrorState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // const [editDialog, setEditDialog] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    if (userId) {
      manageUser.getUserById(userId).then((manageUsers) => {
        if (manageUsers === null) return;
        setName(manageUsers.name);
        setEmail(manageUsers.email);
        setPhoneNumber(manageUsers.phoneNumber);
        setUser(manageUsers);
      });
    }
  }, [userId]);

  const handleSaveClick = async () => {
    if (name && email && phoneNumber && userId) {
      setLoading(true);
      const result = await manageUser.updateUser(userId, { name, email });
      if (result[1] !== null) {
        setErrorState({
          ...result[0]
        });
        setLoading(false);
      } else if (result[0] !== null) {
        setUser(result[0]);
        setLoading(false);
      }
    } else {
      setErrorState({
        name: !name ? 'Required' : undefined,
        email: !email ? 'Required' : undefined,
        phoneNumber: !phoneNumber ? 'Required' : undefined
      });
    }
  };

  const handleCancelClick = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
    setUser(undefined);
  };

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Paper component="aside">
      {loading && 
            <LinearProgress />
      }
      {user && (

        <>
          <AppBar position="static" elevation={0} className={classes.panelAppBar}>
            <Toolbar variant="dense">
              <Typography className={classes.panelTitle} variant="h5">
                  User Info
              </Typography>
              <IconButton
                aria-label="deselect user"
                aria-controls="user-info"
                color="inherit"
              >
                <Close onClick={handleCancelClick} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Divider />
          <form>
            <Box sx={{ px: 4 }}>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="username-input">Name</InputLabel>
                <Input 
                  id="username-input"
                  aria-describedby="username-helper"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="email-input">Payment</InputLabel>
                <Input 
                  id="email-input"
                  aria-describedby="email-helper"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="phone-number-input">Role</InputLabel>
                <Input 
                  id="phone-number-input"
                  aria-describedby="phone-number-helper"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                Max 10 digits
              </FormControl>
              <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
                <Button variant ="contained" color="primary" className={classes.saveButton} onClick={handleSaveClick}
                >Save
                </Button>
                <Button color="primary" onClick={handleCancelClick}>
                Cancel
                </Button>
              </Box>
            </Box>
          </form>
          <Divider />
          <Box sx={{ px: 4 }} 
            borderTop={1}
            borderColor="error.main"
          >
            <Grid container>
              <Grid item lg={8}>
                <Typography variant="caption">
                  Delete this User
                  <br />
                  A deleted User is marked as obsolete
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Button fullWidth variant="contained" className={classes.deleteButton} onClick={handleDeleteDialogOpen}>
                  Delete
                </Button>
                <Dialog
                  fullScreen={fullScreen}
                  open={deleteDialogOpen}
                  onClose={handleDeleteDialogClose}
                  aria-labelledby="delete-user-dialog"
                >
                  <Box>
                    <DialogTitle id="delelte-user-dialog">Are you sure?</DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete this user?
                      <br />
                      Deleting a user makes it as <em>obsolete</em> in the database.
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleDeleteDialogClose} className={classes.dialogDelete}>
                        Delete
                      </Button>
                    </DialogActions>
                  </Box>
                </Dialog>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Paper>

  );
};

export default ManageUsersEditPanel;