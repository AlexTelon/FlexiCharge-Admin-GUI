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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogClose: {
      float: 'right'
    }
  })
);

const AddSingleUserDialog = ({ open, handleClose }: any) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [errorState, setErrorState] = useState<any>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmitClicked = async () => {
    if (name && email && phoneNumber) {
      setLoading(true);
      const result = await manageUser.addUser({
        name,
        email,
        phoneNumber
      });

      if (result[1] !== null) {
        setErrorState({
          ...result[1]
        });
        setLoading(false);
      } else {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          handleClose();
        }, 450);
      } 
    } else {
      setErrorState({
        name: !name ? 'Required' : undefined,
        email: !email ? 'Required' : undefined,
        phoneNumber: !phoneNumber ? 'Required' : undefined
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
                <Input id="user-name-input" aria-describedby="user-name-helper" onChange={handleNameChange} value={name} />
                {errorState.name &&
                  <FormHelperText id="user-address-helper">
                    {errorState.name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.email !== undefined}>
                <InputLabel htmlFor="user-email-input">Email</InputLabel>
                <Input id="user-email-input" aria-describedby="station-email-helper" onChange={handleEmailChange} value={email} />
                <FormHelperText id="user-email-helper">
                  {errorState.email
                    ? `${errorState.email} | Email adress`
                    : 'example@mail.com'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.role !== undefined}>
                <InputLabel htmlFor="user-phone-number-input">Phone number</InputLabel>
                <Input id="user-phone-number-input" aria-describedby="station-phone-number-helper" onChange={handlePhoneNumberChange} value={phoneNumber} />
                <FormHelperText id="user-phone-number-helper">
                  {errorState.phoneNumber
                    ? `${errorState.phoneNumber} | Phone number`
                    : 'Max 10 digits'
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