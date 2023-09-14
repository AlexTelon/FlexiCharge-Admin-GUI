/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, DialogActions, Button, makeStyles, createStyles, LinearProgress, Fade
} from '@material-ui/core';
import { CheckCircle, Close } from '@material-ui/icons';
import { manageUser } from '@/remote-access';
import { Alert } from '@material-ui/lab';
import { User } from '@/remote-access/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogClose: {
      float: 'right'
    }
  })
);

const AddSingleUserDialog = ({ open, handleClose, setReload }: any) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorState, setErrorState] = useState<any>({});
  const [fields, setFields] = useState<Partial<User>>({});

  const handleInputChange = (property: string, value: any) => {
    setFields({
      ...fields,
      [property]: value
    });
  };

  const handleSubmitClicked = async () => {
    if (fields.name && fields.family_name && fields.username && fields.password) {
      setLoading(true);
      const result = await manageUser.addUser((fields as User));

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
        family_name: !fields.family_name ? 'Required' : undefined,
        password: !fields.password ? 'Required' : undefined
      });
    }
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-dialog-title"
        id="add-user-dialog"
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

        <DialogTitle id="add-user-dialog-title">
          Add a User
          <IconButton
            onClick={handleClose}
            className={classes.dialogClose}
            edge="end"
            aria-label="add user dialog close"
            aria-controls="add-user-dialog"
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
                <InputLabel htmlFor="user-name-input">Name</InputLabel>
                <Input id="user-name-input" aria-describedby="user-name-helper" onChange={(e) => handleInputChange('name', e.target.value)} value={fields.name} />
                {errorState.name &&
                  <FormHelperText id="user-address-helper">
                    {errorState.name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.family_name !== undefined}>
                <InputLabel htmlFor="user-family-name-input">Family name</InputLabel>
                <Input id="user-family-name-input" aria-describedby="user-family-name-helper" onChange={(e) => handleInputChange('family_name', e.target.value)} value={fields.family_name} />
                <FormHelperText id="user-family-name-helper">
                  {errorState.family_name
                    ? `${errorState.family_name} | Family name`
                    : ''
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.username !== undefined}>
                <InputLabel htmlFor="user-email-input">Email</InputLabel>
                <Input id="user-email-input" aria-describedby="user-email-helper" onChange={(e) => handleInputChange('username', e.target.value)} value={fields.email} />
                <FormHelperText id="user-email-helper">
                  {errorState.username
                    ? `${errorState.username} | Email adress`
                    : 'example@mail.com'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.password !== undefined}>
                <InputLabel htmlFor="user-password-input">Password</InputLabel>
                <Input id="user-password-input" aria-describedby="user-password-helper" onChange={(e) => handleInputChange('password', e.target.value)} value={fields.password} />
                <FormHelperText id="user-password-helper">
                  {errorState.password
                    ? `${errorState.password} | Password`
                    : 'Temporary'
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

export default AddSingleUserDialog;