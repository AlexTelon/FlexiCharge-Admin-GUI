import { useMediaQuery, Theme, TableProps, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination } from '@material-ui/core';
import ChargerRow from './ChargerRow';
import { Charger } from '@/remote-access/types';
import React, { FC } from 'react';

interface ChargerTableProps {
  chargers: Charger[]
  loaded: boolean
  [key: string]: any
}

const ChargerTable: FC<ChargerTableProps> = ({ loaded, chargers, ...props }: any) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    // 
  };

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  return (
    <>
      <TableContainer className={props.classes.tableContainer}>
        <Table {...tableProps} stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox className={props.classes.checkBox} />
              </TableCell>
              <TableCell>Charger ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chargers?.map((charger: Charger) => {
              return (
                <ChargerRow
                  key={charger.chargerID}
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
        rowsPerPage={10}
        page={1}
        onPageChange={handleChangePage} />
    </>
  );
};

export default ChargerTable;