/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { Invoice } from '@/remote-access/types';
import {
  Theme, useTheme, TableRow, TableCell, Box, Typography,
} from '@material-ui/core';
import { FC } from 'react';

interface PersonRowProps {
  invoice: Invoice
  classes: any
}

const PersonRow: FC<PersonRowProps> = ({ invoice, classes, ...props }) => {
  const theme: Theme = useTheme();

  // Function for converting month number to full month name, saved for eventual later use
  /* function toMonthName() {
    const date = new Date();
    date.setMonth(props.selectedDate.month - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  */

  return (
    <>
      <TableRow
        hover
        style={{ backgroundColor: theme.flexiCharge.primary.white }}
      >
        <TableCell>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color='textPrimary'
              variant='body1'
              className={classes.stationNameCell}
              noWrap
            >
              {invoice.invoiceID}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography
            color="textPrimary"
            variant="body1"
            style={{ maxWidth: '15vw' }}
            noWrap
          >
            {invoice.email}
          </Typography>
        </TableCell>
        <TableCell><a href={invoice.invoiceURL} target="_blank" rel="noreferrer">{invoice.email.split('@')[0]}-{invoice.date}.pdf</a></TableCell>
        <TableCell>
          <Typography
            color="textPrimary"
            variant="body1"
            style={{ maxWidth: '15vw' }}
            noWrap
          >
            {invoice.date}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            color="textPrimary"
            variant="body1"
            style={{ maxWidth: '15vw' }}
            noWrap
          >
            {invoice.totalSum}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PersonRow;