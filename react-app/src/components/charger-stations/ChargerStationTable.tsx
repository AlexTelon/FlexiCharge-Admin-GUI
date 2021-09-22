import { Theme, useTheme, useMediaQuery, TableProps, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { chargerStationCollection } from '../../remote-access';
import { ChargerStation } from '../../remote-access/interfaces';
import ChargerStationTableRow from './ChargerStationTableRow';

interface StationTableState {
  loaded?: boolean
  stations?: ChargerStation[]
  error?: boolean
  errorMessage?: string
}

const ChargerStationsTable = ({ ...rest }: any) => {
  const theme: Theme = useTheme();
  const [state, setState] = useState<StationTableState>({
    loaded: false
  });

  useEffect(() => {
    chargerStationCollection.getAllChargerStations().then((stations) => {
      setState({
        loaded: true,
        stations
      });
    }).catch((_) => {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to load'
      });
    });
  }, []);

  let stationRows = null;
  if (state.stations) {
    stationRows = [];
    const length = state.stations.length > 5 ? 5 : state.stations.length;
    for (let i = 0; i < length; i++) {
      const station = state.stations[i];
      stationRows.push(<ChargerStationTableRow key={station.id} {...rest} station={station} />);
    }
  }

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    // 
  };

  return (
    <>
      <TableContainer
        style={{
          maxHeight: '600px',
          marginTop: theme.spacing(1)
        }}
      >
        {!state.loaded &&
                <LinearProgress />
        }
        <Table {...tableProps} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key="header">
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                Station Name
              </TableCell>
              <TableCell>
                Address
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stationRows}
          </TableBody>
        </Table>
      </TableContainer>
      {state.stations &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={state.stations ? state.stations.length : 0}
          rowsPerPage={5}
          page={0}
          onPageChange={handleChangePage}
        />
      }
    </>
  );
};

export default ChargerStationsTable;