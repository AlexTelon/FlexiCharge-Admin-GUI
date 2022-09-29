/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { ManageUser } from '@/remote-access/types';
import {
    Theme, useTheme, TableRow, TableCell, Box, Typography, Button
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { FC } from 'react';

interface PersonRowProps {
    person: ManageUser
    classes: any
}

const PersonRowIndividualInvoice: FC<PersonRowProps> = ({ person, classes }) => {
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
                <TableCell align='right'>
                    <Button
                        startIcon={<Add />}
                        style={{ color: theme.flexiCharge.primary.white }}
                        variant="contained"
                        color="primary"
                        onClick={() => editClicked()}
                    >
                        Create invoice
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default PersonRowIndividualInvoice;