/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Theme, useTheme, useMediaQuery, TableProps, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { ChargePoint } from '@/remote-access/types';
import ChargePointTableRow from './ChargePointTableRow';

interface HeadCell {
  id: string
  label: string
  alignRight: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Charge-point Name',
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

interface ChargePointTableHeadProps {
  numSelected: number
  rowCount: number
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ChargePointTableHead = (props: ChargePointTableHeadProps) => {
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
                'aria-label': 'select all charge points'
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
  chargePoints?: ChargePoint[]
  error?: boolean
  errorMessage?: string
}

const ChargerPointsTable = (props: any) => {
  const theme: Theme = useTheme();
  /* const [state, setState] = useState<PointTableState>({
    loaded: props.loaded,
    chargePoints: props.chargePoints
  }); */
  const state: ChargerPointTableState = {
    loaded: props.loaded,
    chargePoints: props.chargePoints
  };
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* const loadPoints = () => {
    chargePointCollection.getAllChargerPoints().then((chargePoints) => {
      setState({
        loaded: true,
        chargePoints
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
    loadPoints();
  }, []); */

  useEffect(() => {
    setPage(0); // Reset the page to 0 when chargePoints change
  }, [props.chargePoints]);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = state.chargePoints?.map((chargePoint) => chargePoint.chargePointID);
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

  const handleSelect = (chargePointId: number) => {
    const selectedIndex = selected.indexOf(chargePointId);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, chargePointId);
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

  const isSelected = (chargePointId: number) => selected.includes(chargePointId);

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
          <ChargePointTableHead
            numSelected={selected.length}
            rowCount={state.chargePoints ? state.chargePoints.length : 6}
            handleSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {state.chargePoints?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((chargePoint, index) => {
                const isItemSelected = isSelected(chargePoint.chargePointID);
                return (
                  <ChargePointTableRow
                    key={chargePoint.chargePointID}
                    chargePoint={chargePoint}
                    handleSelect={handleSelect}
                    selected={isItemSelected}
                    {...props}
                  >
                  </ChargePointTableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {state.chargePoints &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={state.chargePoints ? state.chargePoints.length : 0}
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