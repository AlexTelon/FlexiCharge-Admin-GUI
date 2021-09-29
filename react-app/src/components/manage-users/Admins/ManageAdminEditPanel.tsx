/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  AppBar, Box, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, Divider, FormControl, Grid, IconButton, Input, 
  InputLabel, LinearProgress, Paper, Theme, Toolbar, Typography, 
  useMediaQuery 
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { manageAdminCollection } from '../../../remote-access';
import { ManageAdmin } from '../../../remote-access/interfaces';

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
  adminId?: string
}

const ManageAdminsEditPanel: FC<ManageAdminsEditPanelProps> = ({ adminId }) => {
  const classes = useStyle();
  const [admin, setAdmin] = useState<ManageAdmin>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [errorState, setErrorState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (adminId) {
      manageAdminCollection.getAdminById(adminId).then((manageAdmins) => {
        if (manageAdmins === null) return;
        setName(manageAdmins.name);
        setEmail(manageAdmins.email);
        setAdmin(manageAdmins);
      });
    }
  }, [adminId]);
  
  const handleSaveClick = async () => {
    if (name && email && adminId) {
      setLoading(true);
      const result = await manageAdminCollection.updateAdmin(adminId, { name, email });
      if (result[1] !== null) {
        console.log(result);
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
        name: !name ? 'Required' : undefined,
        email: !email ? 'Required' : undefined
      });
    }
  };

  const handleCancleClick = () => {
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
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

  return (
    <Paper component="aside">
      {loading && 
            <LinearProgress />
      }
      {admin && (

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
              >
                <Close />
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
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input 
                  id="email-input"
                  aria-describedby="email-helper"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>
              <Box display="flex" sx={{ flexDirection: 'row-reverse', py: 1 }}>
                <Button variant ="contained" color="primary" className={classes.saveButton} onClick={handleSaveClick}
                >Save
                </Button>
                <Button color="primary" onClick={handleCancleClick}>
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

export default ManageAdminsEditPanel;