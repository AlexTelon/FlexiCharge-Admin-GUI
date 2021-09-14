import React from 'react';
import { Helmet } from 'react-helmet';
import {
  AppBar, Box, createStyles, useMediaQuery, TableProps, 
  makeStyles, Theme, Toolbar, Typography, Container, Grid, IconButton, Checkbox, 
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, 
  useTheme, Paper 
} from '@material-ui/core';
import { FilterList, Error, MoreHoriz } from '@material-ui/icons';

// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appBar: {
      backgroundColor: theme.flexiCharge.accent.primary,
      color: theme.flexiCharge.primary.white,
      fontFamily: theme.flexiCharge.font._main
    },
    contentBox: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(2),
      width: '100%',
      height: '100%',
      maxHeight: '100%',
      top: 0,
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(1)
      }
    },
    contentAppBar: {
      backgroundColor: theme.flexiCharge.primary.white,
      color: theme.flexiCharge.primary.darkGrey,
      fontFamily: theme.flexiCharge.font._main
    },
    contentContainer: {
      backgroundColor: 'transparent',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse'
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse'
      }
    },
    contentSection: {
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    contentTitle: {
      flexGrow: 1
    },
    checkBox: {
      color: theme.flexiCharge.accent.primary,
      '&:checked': {
        color: theme.flexiCharge.accent.neutral
      },
      checked: {
        color: theme.flexiCharge.accent.neutral
      }
    },
    buttonDark: {
      color: theme.flexiCharge.accent.primary
    },
    buttonLight: {
      color: theme.flexiCharge.primary.white
    },
    tableContainer: {
      maxHeight: '600px',
      marginTop: theme.spacing(1)
    },
    stationNameCell: {
      maxWidth: '15vw'
    }
  })
);

const ChargerRow = (props: any) => {
  const theme: Theme = useTheme();

  return (
    <>
      <TableRow
        hover
        style={{ backgroundColor: theme.flexiCharge.primary.white }}
      >
        <TableCell padding='checkbox'>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color='textPrimary'
              variant='body1'
              className={props.classes.stationNameCell}
              noWrap
            >
              {props.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell><Error color='error' />Offline</TableCell>
        <TableCell align='right'>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}; 

const ChargerTable = ({ classes }: any) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    // 
  };

  const chargerRows = [];

  for (let i = 0; i < 5; i++) {
    chargerRows.push(<ChargerRow classes={classes} name='bobo' />);
    chargerRows.push(<ChargerRow classes={classes} name='asdas' />);
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

const ChargersPage = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Admin | Chargers</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <AppBar position='sticky' className={classes.appBar} >
          <Toolbar variant='dense'>
            <Typography variant='h6'>Flexi Charge</Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.contentBox}>
          <Container component='section' className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid item xs={12} md={8} lg={9}>
                <AppBar position='static' className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant='dense'>
                    <Typography className={classes.contentTitle} variant='h6'>
                      Chargers
                    </Typography>
                    <IconButton edge='end'
                      aria-label='charger stations filters'
                      aria-haspopup='true'
                      aria-controls='charger-stations-filters'
                      color='inherit'>
                      <FilterList />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Paper elevation={2}>
                  <ChargerTable classes={classes} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>);
};
 
export default ChargersPage;