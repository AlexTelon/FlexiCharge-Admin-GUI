import React, { FC } from 'react';
import { Theme, useTheme, TableRow, TableCell, Checkbox, Box, Typography, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { ManageAdmin } from '../../remote-access/interfaces';

interface adminRowProps {
  admin: ManageAdmin
  editClicked: (adminId: string) => void
  selected: boolean
  handleSelect: (adminId: string) => void
}

const AdminRow: FC<adminRowProps> = ({ admin, editClicked, selected, handleSelect }) => {
  const theme: Theme = useTheme();

  return (
    <>
      <TableRow 
        hover
        key={admin.id}
        style={{ backgroundColor: theme.flexiCharge.primary.white }} 
      >
        <TableCell padding='checkbox'>
          <Checkbox color="primary" checked={selected} onChange={() => { handleSelect(admin.id); } } />
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
              style={{ maxWidth: '15vw' }}
              noWrap
            >
              {admin.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Button
            startIcon={<Edit />}
            style={{ color: theme.flexiCharge.primary.white }}
            variant="contained"
            color="primary"
            onClick={() => editClicked(admin.id)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminRow;