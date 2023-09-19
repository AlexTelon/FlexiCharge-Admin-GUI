/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import {
    useMediaQuery, Theme, TableProps, TableContainer,
    Table, TableHead, TableRow, TableCell, TableBody,
    TablePagination, LinearProgress
} from '@material-ui/core';
import { Invoice } from '@/remote-access/types';
import React, { FC, useState } from 'react';
import PersonRowIndividualInvoice from './PersonRowIndividualInvoice';

interface PersonTableProps {
    loaded: boolean
    [key: string]: any
}

interface PersonTableState {
    page: number
    rowsPerPage: number
}

const PersonTableIndividualInvoice: FC<PersonTableProps> = ({ loaded, individualInvoices, ...props }: any) => {
    const [state, setState] = useState<PersonTableState>({
        page: 0,
        rowsPerPage: 5
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setState({
            ...state,
            page: newPage
        });
        };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        });
    };

    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
    const tableProps: TableProps = {
        size: isSmallScreen ? 'small' : 'medium'
    };

    return (
        <>
            <TableContainer className={props.classes.tableContainer}>
            {!loaded &&
                <LinearProgress />
            }
            <Table {...tableProps} stickyHeader aria-label='sticky table'>
                <TableHead>
                <TableRow>
                    <TableCell>InvoiceID</TableCell>
                    <TableCell>E-Mail</TableCell>
                    <TableCell>Invoice File (PDF)</TableCell>
                    <TableCell>Date (expires following month)</TableCell>
                    <TableCell>Total fee</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    individualInvoices?.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
                    .map((individualInvoice: Invoice) => {
                        return (
                        <PersonRowIndividualInvoice
                            key={individualInvoices.invoiceID}
                            individualInvoice={individualInvoice}
                            {...props}
                            classes={props.classes}
                        />
                        );
                    })
                }
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component='div'
            count={individualInvoices ? individualInvoices.length : 0}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
        );
};

export default PersonTableIndividualInvoice;