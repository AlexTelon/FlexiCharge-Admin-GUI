import React, { useState, useEffect } from 'react';
import { chargerCollection } from "@/remote-access";
import { useMediaQuery, Theme, TableProps, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination } from "@material-ui/core";
import ChargerRow from './ChargerRow';

export default async function ChargerTable({ classes }: any) {
  const handleChangePage = (event: unknown, newPage: number) => {
    // 
  };

  const [state, setState] = useState<any>({
    loaded: false
  });

  const loadChargers = async () => {
    const [chargers, error] = await chargerCollection.getAllChargers();
    if (chargers){
      setState({
        loaded: true,
        chargers
      })  
    } else if (error){
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to fetch chargers'
      })  
    } 
  }

  useEffect(() => {
    loadChargers();
  }, []);

  const chargerRows = [];

  for (const charger of state.chargers) {
    chargerRows.push(<ChargerRow classes={classes} name={charger.chargerID} />);
  }

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
          <TableBody>{chargerRows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={chargerRows.length}
        rowsPerPage={10}
        page={1}
        onPageChange={handleChangePage} />
    </>
  );
};