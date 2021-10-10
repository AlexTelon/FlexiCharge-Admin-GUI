import React, { useState, useEffect } from 'react';
import { chargerCollection } from '@/remote-access';
import { useMediaQuery, Theme, TableProps, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination } from '@material-ui/core';
import ChargerRow from './ChargerRow';
import { Charger } from '@/remote-access/types';

export default function ChargerTable({ classes, ...rest }: any) {
  const handleChangePage = (event: unknown, newPage: number) => {
    // 
  };

  const [state, setState] = useState<any>({
    loaded: false
  });

  const loadChargers = async () => {
    const [chargers, error] = await chargerCollection.getAllChargers();
    if (chargers) {
      setState({
        loaded: true,
        chargers
      });  
    } else if (error) {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to fetch chargers'
      });  
    } 
  };

  useEffect(() => {
    loadChargers();
  }, []);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table {...tableProps} stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox className={classes.checkBox} />
              </TableCell>
              <TableCell>Charger ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.chargers?.map((charger: Charger) => {
              return (
                <ChargerRow
                  key={charger.chargerID}
                  charger={charger}
                  {...rest}
                  classes={classes}
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
        count={state.chargers ? state.chargers.length : 0}
        rowsPerPage={10}
        page={1}
        onPageChange={handleChangePage} />
    </>
  );
};