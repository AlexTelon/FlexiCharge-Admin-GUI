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
                className={classes.stationNameCell}
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
        <TableCell><a href={individualInvoice.invoiceURL} target="_blank" rel="noreferrer">PDF-LINK </a></TableCell>
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
        <TableCell align='right'>
            <Button
                startIcon={<Add />}
                style={{ color: theme.flexiCharge.primary.white }}
                variant="contained"
                color="primary"
                onClick={() => console.log('create invoice clicked!')}
            >
                Create invoice
            </Button>
        </TableCell>
        </TableRow>
    </>
    );
};

export default PersonRowIndividualInvoice;