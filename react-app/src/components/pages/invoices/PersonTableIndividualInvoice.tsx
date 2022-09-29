/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import {
    useMediaQuery, Theme, TableProps, TableContainer,
    Table, TableHead, TableRow, TableCell, TableBody,
    TablePagination, LinearProgress
} from '@material-ui/core';
import { ManageUser } from '@/remote-access/types';
import React, { FC, useState } from 'react';
import PersonRowIndividualInvoice from './PersonRowIndividualInvoice';

interface PersonTableProps {
    persons: ManageUser[]
    loaded: boolean
    [key: string]: any
}

interface PersonTableState {
    page: number
    rowsPerPage: number
}

const PersonTableIndividualInvoice: FC<PersonTableProps> = ({ loaded, persons, ...props }: any) => {
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
                            <TableCell>UserID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Invoices List</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            persons?.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
                                .map((person: ManageUser) => {
                                    return (
                                        <PersonRowIndividualInvoice
                                            key={person.username}
                                            person={person}
                                            {...props}
                                            classes={props.classes}
                                            selectedDate={props.selectedDate}
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
                count={persons ? persons.length : 0}
                rowsPerPage={state.rowsPerPage}
                page={state.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default PersonTableIndividualInvoice;