/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Theme, useMediaQuery, TableProps, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
// import { manageUserCollection } from '../../../remote-access';
import { User } from '@/remote-access/types';
import { manageUser } from '@/remote-access';
import UserRow from './ManageUserTableRow';

interface HeadCell {
  id: string
  label: string
  alignRight: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'Email',
    label: 'Email adress',
    alignRight: false
  },
  {
    id: 'username',
    label: 'userID',
    alignRight: false
  },
  {
    id: 'created',
    label: 'User created',
    alignRight: false
  },
  {
    id: 'actions',
    label: 'Actions',
    alignRight: true
  }
];

interface ManageUsersTableHeadProps {
  numSelected: number
  rowCount: number
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ManageUserTableHead = (props: ManageUsersTableHeadProps) => {
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
                'aria-label': 'select all users'
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

interface UserTableState {
  loaded?: boolean
  users?: User[]
  error?: boolean
  errorMessage?: string
}

const UserTable = (props: any) => {
  const theme: Theme = useTheme();
  
  const state: UserTableState = {
    users: props.users,
    loaded: props.loaded
  };
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    props.setSelectedUsers(selected);
  }, [selected]);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const tableProps: TableProps = {
    size: isSmallScreen ? 'small' : 'medium'
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = state.users?.map((users) => users.username);
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

  const handleSelect = (username: string) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
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

  const isSelected = (username: string) => selected.includes(username);

  let userRows = [];

  if (state.users) {
    userRows = [];
    const startOfIndex = page * rowsPerPage;
    const remainingRows = state.users.length - startOfIndex;
    const numberOfRows = remainingRows > rowsPerPage ? rowsPerPage : remainingRows;

    for (let i = startOfIndex; i < startOfIndex + numberOfRows; i++) {
      const user = state.users[i];
      const isItemSelected = isSelected(user.username);
      userRows.push(<UserRow key={user.username} user={user} handleSelect={handleSelect} selected={isItemSelected} {...props} />);
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
          <ManageUserTableHead
            numSelected={selected.length}
            rowCount={state.users ? state.users.length : 6}
            handleSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {userRows}
          </TableBody>
        </Table>
      </TableContainer>
      {state.users &&
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={state.users ? state.users.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      }
    </>
  );
};

export default UserTable;