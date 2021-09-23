/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, DialogActions, Button, makeStyles, createStyles, LinearProgress, Fade, TextField, MenuItem
} from '@material-ui/core';
import { CheckCircle, Close } from '@material-ui/icons';
import { manageUserCollection } from '../../remote-access';
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
  const [payment, setPayment] = useState<string>();
  const [admin, setAdmin] = useState<string>();
  const [errorState, setErrorState] = useState<any>({});

  const HandleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const HandlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value);
  };
  const HandleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin(e.target.value);
  };

  const roles = [
    {
      value: 'Admin',
      label: 'Admin'
    },
    {
      value: 'User',
      label: 'User'
    }
  ];

  const handleSubmitClicked = async () => {
    if (name && payment && admin) {
      setLoading(true);
      const result = await manageUserCollection.addUser({
        name,
        payment,
        admin
      });

      if (result[1] !== null) {
        console.log(result);
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
        payment: !payment ? 'Required' : undefined,
        admin: !admin ? 'Required' : undefined
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
                <Input id="user-name-input" aria-describedby="user-name-helper" onChange={HandleNameChange} value={name} />
                {errorState.name &&
                  <FormHelperText id="user-address-helper">
                    {errorState.name}
                  </FormHelperText>
                }
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.payment !== undefined}>
                <InputLabel htmlFor="user-apyment-input">Payment</InputLabel>
                <Input id="user-payment-input" aria-describedby="station-payment-helper" onChange={HandlePaymentChange} value={payment} />
                <FormHelperText id="user-payment-helper">
                  {errorState.address
                    ? `${errorState.payment} | Payment type`
                    : 'Payment type'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.admin !== undefined}>
                <TextField select id="user-admin-input" label="select" aria-describedby="user-admin-helper" onChange={HandleAdminChange} value={roles} >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <FormHelperText id="user-admin-helper">
                  {errorState.admin
                    ? `${errorState.admin} | Admin`
                    : 'Admin'
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