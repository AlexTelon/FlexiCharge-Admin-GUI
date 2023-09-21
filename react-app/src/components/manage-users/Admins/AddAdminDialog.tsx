/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, DialogActions, Button, makeStyles, createStyles, LinearProgress, Fade
} from '@material-ui/core';
import { CheckCircle, Close } from '@material-ui/icons';
import { manageAdmin } from '../../../remote-access';
import { Alert } from '@material-ui/lab';
import { Admin } from '@/remote-access/types';

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
  const [fields, setFields] = useState<any>({});
  const [errorState, setErrorState] = useState<any>({});

  const handleInputChange = (property: string, value: any) => {
    setFields({
      ...fields,
      [property]: value
    });
  };

  const handleSubmitClicked = async () => {
    if (fields.name && fields.family_name && fields.username) {
      setLoading(true);
      const result = await manageAdmin.addAdmin(fields as Admin);

      if (result[1] !== null) {        
        setErrorState({
          ...result[1],
          alert: result[1].error
        });
        setLoading(false);
      } else {
        setLoading(false);
        setSuccess(true);
        setReload(true);
        setErrorState({});
        setTimeout(() => {
          setSuccess(false);
          setFields({});
          handleClose();
        }, 450);
      } 
    } else {
      setErrorState({
        name: !fields.name ? 'Required' : undefined,
        username: !fields.username ? 'Required' : undefined,
        family_name: !fields.family_name ? 'Required' : undefined
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
              <FormControl style={{ marginTop: 16 }} fullWidth variant="outlined" error={errorState.name !== undefined}>
                <InputLabel htmlFor="admin-name-input">Name</InputLabel>
                <Input id="admin-name-input" aria-describedby="admin-name-helper" onChange={(e) => handleInputChange('name', e.target.value)} value={fields.name} />
                {errorState.name &&
                  <FormHelperText id="admin-address-helper">
                    {errorState.name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 16 }} fullWidth variant="outlined" error={errorState.family_name !== undefined}>
                <InputLabel htmlFor="admin-family-name-input">Family Name</InputLabel>
                <Input id="admin-family-name-input" aria-describedby="admin-family-name-helper" onChange={(e) => handleInputChange('family_name', e.target.value)} value={fields.family_name} />
                {errorState.family_name &&
                  <FormHelperText id="admin-family-name-helper">
                    {errorState.family_name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 16 }} fullWidth variant="outlined" error={errorState.username !== undefined}>
                <InputLabel htmlFor="admin-email-input">Email</InputLabel>
                <Input id="admin-email-input" aria-describedby="admin-email-helper" onChange={(e) => handleInputChange('username', e.target.value)} value={fields.email} />
                <FormHelperText id="admin-email-helper">
                  {errorState.username
                    ? `${errorState.username} | Email adress`
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