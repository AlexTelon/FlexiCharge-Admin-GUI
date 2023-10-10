/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Theme, useTheme, useMediaQuery, TableProps, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { ChargerPoint } from '@/remote-access/types';
import ChargerPointTableRow from './ChargerPointTableRow';

interface HeadCell {
  id: string
  label: string
  alignRight: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Charger-Point Name',
    alignRight: false
  },
  {
    id: 'price',
    label: 'Price',
    alignRight: false
  },
  {
    id: 'actions',
    label: 'Actions',
    alignRight: true
  }
];

interface ChargerPointTableHeadProps {
  numSelected: number
  rowCount: number
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ChargerPointTableHead = (props: ChargerPointTableHeadProps) => {
  const { rowCount, numSelected, handleSelectAllClick } = props;
  return (
    <>
      <TableHead>
        <TableRow key="header">
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={handleSelectAllClick}
              inputProps={{
                'aria-label': 'select all chargepoints'
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? 'right' : 'left' }
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};

interface ChargerPointTableState {
  loaded?: boolean
  chargerPoints?: ChargerPoint[]
  error?: boolean
  errorMessage?: string
}

const ChargerPointsTable = (props: any) => {
  const theme: Theme = useTheme();
  /* const [state, setState] = useState<StationTableState>({
    loaded: props.loaded,
    chargerPoints: props.chargerPoints
  }); */
  const state: ChargerPointTableState = {
    loaded: props.loaded,
    chargerPoints: props.chargerPoints
  };
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* const loadStations = () => {
    chargerPointCollection.getAllChargerPoints().then((chargerPoints) => {
      setState({
        loaded: true,
        chargerPoints
      });
    }).catch((_) => {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to load'
      });
    });
  };

  useEffect(() => {
    loadStations();
  }, []); */

  useEffect(() => {
    setPage(0); // Reset the page to 0 when chargerPoints change
  }, [props.chargerPoints]);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = state.chargerPoints?.map((chargerPoint) => chargerPoint.chargePointID);
      if (newSelecteds === undefined) return;
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = (chargerPointId: number) => {
    const selectedIndex = selected.indexOf(chargerPointId);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, chargerPointId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (chargerPointId: number) => selected.includes(chargerPointId);

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
          <ChargerPointTableHead
            numSelected={selected.length}
            rowCount={state.chargerPoints ? state.chargerPoints.length : 6}
            handleSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {state.chargerPoints?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((chargerPoint, index) => {
                const isItemSelected = isSelected(chargerPoint.chargePointID);
                return (
                  <ChargerPointTableRow
                    key={chargerPoint.chargePointID}
                    chargerPoint={chargerPoint}
                    handleSelect={handleSelect}
                    selected={isItemSelected}
                    {...props}
                  >
                  </ChargerPointTableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {state.chargerPoints &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={state.chargerPoints ? state.chargerPoints.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      }
    </>
  );
};

export default ChargerPointsTable;