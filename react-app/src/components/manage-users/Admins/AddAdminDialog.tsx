/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, DialogActions, Button, makeStyles, createStyles, LinearProgress, Fade
} from '@material-ui/core';
import { CheckCircle, Close } from '@material-ui/icons';
import { manageAdminCollection } from '../../../remote-access';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogClose: {
      float: 'right'
    }
  })
);

const AddSingleAdminDialog = ({ open, handleClose, setReload }: any) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [errorState, setErrorState] = useState<any>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmitClicked = async () => {
    if (name && email) {
      setLoading(true);
      const result = await manageAdminCollection.addAdmin({
        name,
        email
      });

      if (result[1] !== null) {
        console.log(result[1]);
        
        setErrorState({
          ...result[1]
        });
        setLoading(false);
      } else {
        setLoading(false);
        setSuccess(true);
        setReload(true);
        setTimeout(() => {
          setSuccess(false);
          handleClose();
        }, 450);
      } 
    } else {
      setErrorState({
        name: !name ? 'Required' : undefined,
        email: !email ? 'Required' : undefined
      });
    }
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-admin-dialog-title"
        id="add-admin-dialog"
      >
        {loading &&
          <LinearProgress />
        }

        {success &&
          <Fade in={true}>
            <Box
              style={{
                position: 'absolute',
                backgroundColor: theme.flexiCharge.accent.primary,
                zIndex: 9999,
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle style={{ color: theme.flexiCharge.primary.white, fontSize: 72 }} />

            </Box>
          </Fade>
        }

        <DialogTitle id="add-admin-dialog-title">
          Add an Admin
          <IconButton
            onClick={handleClose}
            className={classes.dialogClose}
            edge="end"
            aria-label="add admin dialog close"
            aria-controls="add-admin-dialog"
            color="inherit"
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {errorState.alert !== undefined &&
            <Alert style={{ width: '100%' }} severity="warning">{errorState.alert}</Alert>
          }
          <form>
            <Box>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.name !== undefined}>
                <InputLabel htmlFor="admin-name-input">Name</InputLabel>
                <Input id="admin-name-input" aria-describedby="admin-name-helper" onChange={handleNameChange} value={name} />
                {errorState.name &&
                  <FormHelperText id="admin-address-helper">
                    {errorState.name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.email !== undefined}>
                <InputLabel htmlFor="admin-email-input">Email</InputLabel>
                <Input id="admin-email-input" aria-describedby="admin-email-helper" onChange={handleEmailChange} value={email} />
                <FormHelperText id="admin-email-helper">
                  {errorState.email
                    ? `${errorState.email} | Email adress`
                    : 'Email adress'
                  }
                </FormHelperText>
              </FormControl>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            autoFocus
            style={{ color: 'white' }}
            onClick={handleSubmitClicked}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSingleAdminDialog;