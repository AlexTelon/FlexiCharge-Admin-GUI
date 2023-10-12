import {
  useMediaQuery, type Theme, type TableProps, TableContainer,
  Table, TableHead, TableRow, TableCell, TableBody,
  TablePagination, LinearProgress
} from '@material-ui/core';
import ChargerRow from './ChargerRow';
import { type Charger } from '@/remote-access/types';
import React, { type FC, useState, useEffect } from 'react';

interface ChargerTableProps {
  chargers: Charger[]
  loaded: boolean
  [key: string]: any
}

interface ChargerTableState {
  page: number
  rowsPerPage: number
}

const ChargerTable: FC<ChargerTableProps> = ({ loaded, chargers, ...props }: any) => {
  const [state, setState] = useState<ChargerTableState>({
    page: 0,
    rowsPerPage: 5
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      page: 0
    }));
  }, [chargers]);

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
              <TableCell>Connector ID</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Charge-point ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              chargers?.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
                .map((charger: Charger) => {
                  return (
                    <ChargerRow
                      key={charger.connectorID}
                      charger={charger}
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
        count={chargers ? chargers.length : 0}
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ChargerTable;