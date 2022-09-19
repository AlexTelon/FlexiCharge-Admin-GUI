import {
  useMediaQuery, Theme, TableProps, TableContainer,
  Table, TableHead, TableRow, TableCell, TableBody,
  TablePagination, LinearProgress
} from '@material-ui/core';
import PersonRow from './PersonRow';
import { ManageUser } from '@/remote-access/types';
import React, { FC, useState } from 'react';

interface PersonTableProps {
  persons: ManageUser[]
  loaded: boolean
  [key: string]: any
}

interface PersonTableState {
  page: number
  rowsPerPage: number
}

const PersonTable: FC<PersonTableProps> = ({ loaded, persons, ...props }: any) => {
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
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Invoice File</TableCell>
              <TableCell>placeholder</TableCell>
              <TableCell align='right'>placeholder</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              persons?.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
                .map((person: ManageUser) => {
                  return (
                    <PersonRow
                      key={person.username}
                      person={person}
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
        count={persons ? persons.length : 0}
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PersonTable;