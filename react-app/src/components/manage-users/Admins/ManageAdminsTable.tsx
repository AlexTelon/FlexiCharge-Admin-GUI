/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Theme, useMediaQuery, TableProps, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Admin } from '../../../remote-access/types';
import AdminRow from './ManageAdminTableRow';

interface HeadCell {
  id: string
  label: string
  alignRight: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Name/userID',
    alignRight: false
  },
  {
    id: 'email',
    label: 'Email',
    alignRight: false
  },
  {
    id: 'actions',
    label: 'Actions',
    alignRight: true
  }
];

interface ManageAdminsTableHeadProps {
  numSelected: number
  rowCount: number
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ManageAdminTableHead = (props: ManageAdminsTableHeadProps) => {
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
                'aria-label': 'select all Admins'
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? 'right' : 'left'}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};

interface AdminTableState {
  loaded?: boolean
  admins?: Admin[]
  error?: boolean
  errorMessage?: string
}

const AdminTable = (props: any) => {
  const theme: Theme = useTheme();
  const state: AdminTableState = {
    loaded: props.loaded,
    admins: props.admins
  };
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    props.setSelectedAdmins(selected);
  }, [selected]);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = state.admins?.map((admins) => admins.username);
      if (newSelected === undefined) return;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelect = (adminId: string) => {
    const selectedIndex = selected.indexOf(adminId);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, adminId);
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

  const isSelected = (adminId: string) => selected.includes(adminId);

  let adminRows = [];

  if (state.admins) {
    adminRows = [];
    const startOfIndex = page * rowsPerPage;
    const remainingRows = state.admins.length - startOfIndex;
    const numberOfRows = remainingRows > rowsPerPage ? rowsPerPage : remainingRows;

    for (let i = startOfIndex; i < startOfIndex + numberOfRows; i++) {
      const admin = state.admins[i];
      const isItemSelected = isSelected(admin.username);
      adminRows.push(<AdminRow key={admin.username} admin={admin} handleSelect={handleSelect} selected={isItemSelected} {...props} />);
    }
  }

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
          <ManageAdminTableHead
            numSelected={selected.length}
            rowCount={state.admins ? state.admins.length : 6}
            handleSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {adminRows}
          </TableBody>
        </Table>
      </TableContainer>
      {state.admins &&
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={state.admins ? state.admins.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      }
    </>
  );
};

export default AdminTable;