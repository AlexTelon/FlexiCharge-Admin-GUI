/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, DialogActions, Button, makeStyles, createStyles, LinearProgress, Fade
} from '@material-ui/core';
import { CheckCircle, Close } from '@material-ui/icons';
import { userCollection } from '@/remote-access';
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [family_name, setFamilyName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [errorState, setErrorState] = useState<any>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlefamilyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmitClicked = async () => {
    if (name && email && family_name && username && password) {
      setLoading(true);
      const result = await userCollection.addUser({
        username,
        name,
        family_name,
        email,
        password
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
        family_name: !family_name ? 'Required' : undefined,
        password: !password ? 'Required' : undefined
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
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.family_name !== undefined}>
                <InputLabel htmlFor="user-family-name-input">Family name</InputLabel>
                <Input id="user-family-name-input" aria-describedby="user-family-name-helper" onChange={handlefamilyNameChange} value={family_name} />
                <FormHelperText id="user-family-name-helper">
                  {errorState.family_name
                    ? `${errorState.family_name} | Family name`
                    : ''
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.email !== undefined}>
                <InputLabel htmlFor="user-email-input">Email</InputLabel>
                <Input id="user-email-input" aria-describedby="user-email-helper" onChange={handleEmailChange} value={email} />
                <FormHelperText id="user-email-helper">
                  {errorState.email
                    ? `${errorState.email} | Email adress`
                    : 'example@mail.com'
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.username !== undefined}>
                <InputLabel htmlFor="user-username-input">Username</InputLabel>
                <Input id="user-username-input" aria-describedby="user-username-helper" onChange={handleUsernameChange} value={username} />
                <FormHelperText id="user-username-helper">
                  {errorState.username
                    ? `${errorState.username} | Username`
                    : ''
                  }
                </FormHelperText>
              </FormControl>
              <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined" error={errorState.password !== undefined}>
                <InputLabel htmlFor="user-password-input">Password</InputLabel>
                <Input id="user-password-input" aria-describedby="user-password-helper" onChange={handlePasswordChange} value={password} />
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