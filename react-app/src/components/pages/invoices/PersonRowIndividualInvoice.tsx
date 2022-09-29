/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { ManageUser } from '@/remote-access/types';
import {
    Theme, useTheme, TableRow, TableCell, Box, Typography, Button
} from '@material-ui/core';
import { FC } from 'react';
import pdf from './dummy invoice.pdf';

interface PersonRowProps {
    person: ManageUser
    classes: any
}

const PersonRowIndividualInvoice: FC<PersonRowProps> = ({ person, classes, ...props }) => {
    const theme: Theme = useTheme();
    function editClicked() {
        console.log('edit clicked!');
    }
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
                            {person.username}
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
                        {person.name}
                    </Typography>
                </TableCell>
                <TableCell><a href={pdf} target="_blank" rel="noreferrer">View all invoices for user</a></TableCell>
            </TableRow>
        </>
    );
};

export default PersonRowIndividualInvoice;