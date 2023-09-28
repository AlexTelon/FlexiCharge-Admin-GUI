/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import {
  Theme, useTheme, useMediaQuery, Dialog,
  DialogTitle, IconButton, DialogContent, Box,
  FormControl, InputLabel, Input, FormHelperText, 
  DialogActions, Button, makeStyles, createStyles, 
  LinearProgress, Fade, InputAdornment, Select,
  AppBar, Toolbar, Typography, Container, Grid,
  Paper, Tab, alpha, InputBase, styled,
  Divider, MenuItem, TableCell,
  TextField, DialogContentText
} from '@material-ui/core';
import { CheckCircle, Close, Add as AddIcon } from '@material-ui/icons';
import { manageChargerStation } from '@/remote-access';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogClose: {
      float: 'right'
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
);

const AddSingleInvoiceDialog = ({ open, handleClose, handleSave }: any ) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const createdAtTimestamp = Math.floor(new Date().getTime() / 1000);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const formattedDate = `${year}-${month}`;

  //Add Invoice
  const [invoice, setInvoice] = useState({
    email: '',
    createdAt: createdAtTimestamp,
    totalSum: 1,
    status: 'NOT-PAID',
    date: formattedDate
  });

  //Handle change in form
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setInvoice({
      ...invoice,
      [name || '']: value,
    });
  };

  const handleSubmitClicked = async () => {

  }

  return (
    <Dialog 
    open={open} 
    onClose={handleClose} 
    aria-labelledby="add-invoice-dialog-title"
    id="add-invoice-dialog"
    >
      <DialogTitle id="add-invoice-dialog-title">Generate New Invoice</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          name="email"
          type="email"
          value={invoice.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Total Sum"
          name="totalSum"
          type="number"
          value={invoice.totalSum}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ min: 1, max: 1000 }}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={invoice.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="PAID">PAID</MenuItem>
            <MenuItem value="NOT-PAID">NOT-PAID</MenuItem>
            <MenuItem value="ALL">ALL</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => {
            handleSave(invoice);
            handleClose();
          }}
        >
          Generate
        </Button>
      </div>
    </Dialog>
  );
};

export default AddSingleInvoiceDialog;