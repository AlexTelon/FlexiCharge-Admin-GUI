/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { Invoice } from '@/remote-access/types';
import {
    Theme, useTheme, TableRow, TableCell, Box, Typography, Button
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { FC } from 'react';

interface IndividualPersonRowProps {
    individualInvoice: Invoice
    classes: any
}

const PersonRowIndividualInvoice: FC<IndividualPersonRowProps> = ({ individualInvoice, classes, ...props}) => {
    const theme: Theme = useTheme();

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
                className={classes.pointNameCell}
                noWrap
            >
                {individualInvoice.invoiceID}
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
            {individualInvoice.email}
            </Typography>
        </TableCell>
        <TableCell><a href={individualInvoice.invoiceURL} target="_blank" rel="noreferrer">{individualInvoice.email.split('@')[0]}-{individualInvoice.date}.pdf </a></TableCell>
        <TableCell>
            <Typography
            color="textPrimary"
            variant="body1"
            style={{ maxWidth: '15vw' }}
            noWrap
            >
            {individualInvoice.date}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography
            color="textPrimary"
            variant="body1"
            style={{ maxWidth: '15vw' }}
            noWrap
            >
            {individualInvoice.totalSum}
            </Typography>
        </TableCell>
        </TableRow>
    </>
    );
};

export default PersonRowIndividualInvoice;