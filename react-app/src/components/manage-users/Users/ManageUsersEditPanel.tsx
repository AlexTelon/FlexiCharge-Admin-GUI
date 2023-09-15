/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { AppBar, Box, Button, Dialog, DialogContentText, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, Input, InputLabel, LinearProgress, Paper, Theme, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { Close, LockOpen } from '@material-ui/icons';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { manageUser } from '@/remote-access';
import { User } from '@/remote-access/types';
import { Alert } from '@material-ui/lab';

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
  username?: string
  setActiveUser: any
}

const ManageUsersEditPanel: FC<ManageUsersEditPanelProps> = ({ username, setActiveUser }) => {
  const classes = useStyle();
  const [user, setUser] = useState<User>();
  const [fields, setFields] = useState<Partial<User>>({});
  const [errorState, setErrorState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleInputChange = (property: string, value: any) => {
    setFields({
      ...fields,
      [property]: value
    });
  };

  useEffect(() => {
    if (username) {
      manageUser.getUserById(username).then((result) => {
        if (result[0] === null) {
          console.log(result[1]);
          
          return;
        }
        const user = result[0];
        
        setFields({
          name: user.name,
          family_name: user.family_name
        });
        setUser(user);
      });
    }
  }, [username]);

  const handleSaveClick = async () => {
    if (username && fields.name && fields.family_name) {
      setLoading(true);
      const result = await manageUser.updateUser(username, {
        name: fields.name,
        family_name: fields.family_name 
      });

      if (result[1] !== null) {
        setErrorState({
          ...result[0],
          alert: result[1].error
        });
        setLoading(false);
      } else if (result[0] !== null) {
        console.log('new user', result[0]);
        
        setUser(result[0]);
        setLoading(false);
      }
    } else {
      setErrorState({
        name: !fields.name ? 'Required' : undefined,
        family_name: !fields.family_name ? 'Required' : undefined
      });
    }
  };
  
  const handleCancelClick = () => {
    if (user) {
      setFields({
        name: user.name,
        family_name: user.family_name
      });
    }
  };

  const handleDeletClick = () => {
    if (!user) return;
    manageUser.deleteUser(user?.username).then((wasSuccess) => {
      if (wasSuccess) {
        setActiveUser(undefined);
      } else {
        setErrorState({
          ...errorState,
          alert: 'An error occured'
        });
      }
      handleDeleteDialogClose();
    }).catch((_: any) => {
      setErrorState({
        ...errorState,
        alert: 'An error occured'
      });
      handleDeleteDialogClose();
    });
  };

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleResetUserPassword = () => {
    manageUser.resetUserPassword(user?.email).then((wasSuccess) => {
      if (wasSuccess) {
        console.log('success');
      } else {
        console.log('failed');
      }
    }).catch((_: any) => {
      console.log('error');
    });
  };

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
    <Paper component="aside">
      {loading && 
            <LinearProgress />
      }
      {user && username && (

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
                onClick={() => { handleCancelClick(); setActiveUser(undefined); }} 
              >
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Divider />
          <form>
            {errorState.alert &&
              <Alert severity="warning">{errorState.alert}</Alert>
            }
            <Box sx={{ px: 1 }}>
              <FormControl fullWidth variant="filled" error={errorState.name !== undefined}>
                <InputLabel htmlFor="username-input">Name</InputLabel>
                <Input 
                  id="username-input"
                  aria-describedby="username-helper"
                  value={fields.name}
                  onChange={(e) => handleInputChange('name', e.target.value) }
                />
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.family_name !== undefined}>
                <InputLabel htmlFor="phone-number-input">Family name</InputLabel>
                <Input 
                  id="phone-number-input"
                  aria-describedby="phone-number-helper"
                  value={fields.family_name}
                  onChange={(e) => handleInputChange('family_name', e.target.value) }
                />
                Max 10 digits
              </FormControl>
              <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
              <Button
                  startIcon={<LockOpen />}
                  className={classes.saveButton}
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen()}
                >
                Reset Password
                </Button>
                <Button variant ="contained" color="primary" className={classes.saveButton} onClick={handleSaveClick}>
                  Save
                </Button>
                <Button color="primary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Box>  
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
                      <Button onClick={handleDeletClick} className={classes.dialogDelete}>
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