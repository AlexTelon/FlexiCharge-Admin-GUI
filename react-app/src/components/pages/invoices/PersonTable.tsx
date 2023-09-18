import {
  useMediaQuery, Theme, TableProps, TableContainer,
  Table, TableHead, TableRow, TableCell, TableBody,
  TablePagination, LinearProgress
} from '@material-ui/core';
import PersonRow from './PersonRow';
import { Invoice } from '@/remote-access/types';
import React, { FC, useState } from 'react';

interface PersonTableProps {
  loaded: boolean
  [key: string]: any
}

interface PersonTableState {
  page: number
  rowsPerPage: number
}

const PersonTable: FC<PersonTableProps> = ({ loaded, invoices, selectedYear, selectedMonth, ...props }: any) => {
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
      <TableContainer data-cy="all-invoices" className={props.classes.tableContainer}>
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
              invoices?.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
                .map((invoice: Invoice) => {
                  return (
                    <PersonRow
                      key={invoice.invoiceID}
                      invoice={invoice}
                      {...props}
                      classes={props.classes}
                      selectedYear={selectedYear}
                      selectedMonth={selectedMonth}
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
        count={invoices ? invoices.length : 0}
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PersonTable;