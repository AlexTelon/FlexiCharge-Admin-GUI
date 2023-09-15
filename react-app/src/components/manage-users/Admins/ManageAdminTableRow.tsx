import React, { FC } from 'react';
import { Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Admin } from '../../../remote-access/types';

interface adminRowProps {
  admin: Admin
  editClicked: (adminId: string) => void
  selected: boolean
  handleSelect: (adminId: string) => void
}

const AdminRow: FC<adminRowProps> = ({ admin, editClicked, selected, handleSelect }) => {
  const theme: Theme = useTheme();

  const name = (admin.name) ? admin.name : admin.username; 

  return (
    <>
      <TableRow 
        hover
        key={admin.username}
        style={{ backgroundColor: theme.flexiCharge.primary.white }} 
      >
        <TableCell padding='checkbox'>
          <Checkbox color="primary" checked={selected} onChange={() => { handleSelect(admin.username); } } />
        </TableCell>
        <TableCell>
          <Box 
            sx={{ 
              alignItems: 'center', 
              display: 'flex' 
            }}>
            <Typography
              color='textPrimary'
              variant='body1'
              style={{ maxWidth: '30vw' }}
              noWrap
            >
              {name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          {admin.email}
        </TableCell>
        <TableCell align="right">
          <Button
            startIcon={<Edit />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
            onClick={() => editClicked(admin.username)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminRow;