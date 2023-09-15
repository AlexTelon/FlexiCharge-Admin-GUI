/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  AppBar, Box, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, Divider, FormControl, Grid, IconButton, Input, 
  InputLabel, LinearProgress, Paper, Theme, Toolbar, Typography, 
  useMediaQuery 
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { manageAdmin } from '../../../remote-access';
import { Admin } from '../../../remote-access/types';

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

interface ManageAdminsEditPanelProps {
  username?: string
  setActiveUser: any
}

const ManageAdminsEditPanel: FC<ManageAdminsEditPanelProps> = ({ username, setActiveUser }) => {
  const classes = useStyle();
  const [admin, setAdmin] = useState<Admin>();
  const [fields, setFields] = useState<any>({});
  const [errorState, setErrorState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (username) {
      manageAdmin.getAdminById(username).then((admin) => {
        if (admin === null) return;
        setFields({
          ...admin
        });
        setAdmin(admin);
      });
    }
  }, [username]);
  
  const handleSaveClick = async () => {
    if (fields.name && fields.email && username) {
      setLoading(true);
      const result = await manageAdmin.updateAdmin(username, {
        name: fields.name,
        email: fields.email
      });

      if (result[1] !== null) {
        setErrorState({
          ...result[0]
        });
        setLoading(false);
      } else if (result[0] !== null) {
        setAdmin(result[0]);
        setLoading(false);
      }
    } else {
      setErrorState({
        name: !fields.name ? 'Required' : undefined,
        email: !fields.email ? 'Required' : undefined,
        password: !fields.password ? 'Required' : undefined
      });
    }
  };

  const handleInputChange = (property: string, value: any) => {
    setFields({
      ...fields,
      [property]: value
    });
  };

  const handleCancelClick = () => {
    if (admin) {
      setFields({
        ...admin
      });
    }
  };

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteClick = async () => {
    if (!admin) return;
    const wasSuccess = await manageAdmin.deleteAdmin(admin?.username);
    if (wasSuccess) {
      setActiveUser(undefined);
    } else {
      setErrorState({
        ...errorState,
        alert: 'An error occurred'
      });
    }
    handleDeleteDialogClose();
  };

  return (
    <Paper component="aside">
      {loading && 
            <LinearProgress />
      }
      {admin && username && (

        <>
          <AppBar position="static" elevation={0} className={classes.panelAppBar}>
            <Toolbar variant="dense">
              <Typography className={classes.panelTitle} variant="h5">
                  Admin Info
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
            <Box sx={{ px: 4 }}>
              <FormControl fullWidth variant="filled" error={errorState.name !== undefined}>
                <InputLabel htmlFor="username-input">Name</InputLabel>
                <Input 
                  id="username-input"
                  aria-describedby="username-helper"
                  value={fields.name}
                  onChange={(e) => handleInputChange('name', e.target.value) }
                />
              </FormControl>
              <FormControl fullWidth variant="filled" error={errorState.email !== undefined}>
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input 
                  id="email-input"
                  aria-describedby="email-helper"
                  value={fields.email}
                  onChange={(e) => handleInputChange('email', e.target.value) }
                />
              </FormControl>
              {/* <FormControl fullWidth variant="filled" error={errorState.password !== undefined}>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input 
                  id="password-input"
                  aria-describedby="password-helper"
                  value={fields.password}
                  onChange={(e) => handleInputChange('password', e.target.value) }
                />
              </FormControl> */}
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
                  Delete this Admin
                  <br />
                  A deleted Admin is marked as obsolete
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
                      Are you sure you want to delete this admin?
                      <br />
                      Deleting an admin makes it as <em>obsolete</em> in the database.
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleDeleteClick} className={classes.dialogDelete}>
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

export default ManageAdminsEditPanel;