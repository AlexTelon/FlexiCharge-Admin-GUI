import {
  AppBar, Box, Checkbox, Container, createStyles,
  Grid, IconButton, makeStyles, Table, TableCell,
  TableHead, TableRow, Theme, Toolbar, Typography,
  Accordion, AccordionDetails, AccordionSummary, AccordionActions,
  Button, Divider, TableBody, TablePagination, TableContainer, Paper,
  Hidden, useMediaQuery, TableProps, Collapse
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Edit, ExpandMore, FilterList } from '@material-ui/icons';
import React, { FC, useEffect, useState } from 'react';
import ChargerStationEditPanel from './ChargerStationEditPanel';
import AddSingleStationDialog from './AddStationDialog';
import { useTheme } from '@material-ui/styles';
import { chargerStationCollection } from '../../remote-access';
import { ChargerStation } from '../../remote-access/interfaces';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appBar: {
      backgroundColor: theme.flexiCharge.accent.primary,
      color: theme.flexiCharge.primary.white,
      fontFamily: theme.flexiCharge.font._main
    },
    contentBox: {
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

interface StationTableRowProps {
  station: ChargerStation
  classes: any
}

const ChargerTableCell: FC<StationTableRowProps> = ({ station, classes }) => {
  const [open, setOpen] = useState(false);
  const theme: Theme = useTheme();
  return (
    <>
      <TableRow
        hover
        key={station.id}
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: open ? 'rgba(240,240,240,1)' : theme.flexiCharge.primary.white }}
      >
        <TableCell padding="checkbox">
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
              color="textPrimary"
              variant="body1"
              className={classes.stationNameCell}
              noWrap
            >
              {station.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          Busy
        </TableCell>
        <TableCell align="right">
          <Hidden xsDown>
            <Button className={classes.buttonDark} color="primary">
              Manage Chargers
            </Button>
          </Hidden>
          <Button startIcon={<Edit />} className={classes.buttonLight} variant="contained" color="primary">
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component="td" margin={1}>
              sad
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

interface StationTableState {
  loaded?: boolean
  stations?: ChargerStation[]
  error?: boolean
  errorMessage?: string
}

const ChargersTable = ({ classes }: any) => {
  const [state, setState] = useState<StationTableState>({
    loaded: false
  });
  
  useEffect(() => {
    chargerStationCollection.getAllChargerStations().then((stations) => {
      setState({
        loaded: true,
        stations: stations
      });
    }).catch((_) => {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Could not load staions, check connect or try again later'
      });
    });
  }, []);

  console.log(state);
  let chargerCells = null;
  if (state.loaded && state.stations) {
    chargerCells = [];
    for (let i = 0; i < state.stations.splice(0, 12).length; i++) {
      const station = state.stations[i];
      console.log(station);
      chargerCells.push(<ChargerTableCell station={station} classes={classes} />);
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
      <TableContainer className={classes.tableContainer}>
        <Table {...tableProps} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox className={classes.checkBox} />
              </TableCell>
              <TableCell>
                Station Name
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chargerCells}
          </TableBody>
        </Table>
      </TableContainer>
      {state.stations && !state.error &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={chargerCells ? chargerCells.length : 0}
          rowsPerPage={5}
          page={1}
          onPageChange={handleChangePage}
        />
      }
    </>
  );
};

const ChargerStationsSettingsAccordian = ({ classes }: any) => {
  const [openAddStationDialog, setOpenAddStationDialog] = useState<boolean>(false);
  const handleOpenAddStationDialog = () => {
    setOpenAddStationDialog(true);
  };
  const handleCloseAddStationDialog = () => {
    setOpenAddStationDialog(false);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="charger-stations-actions-panel"
        id="charger-stations-actions-panel-header"
      >
        <Grid container id="charger-stations-actions-panel">
          <Grid item xs={9} md={10}>
            <Typography>
              0 Selected
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            More Actions
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button variant="contained" className={classes.buttonLight} color='primary' onClick={handleOpenAddStationDialog}>
              Add Station
        </Button>
      </AccordionActions>

      <AddSingleStationDialog open={openAddStationDialog} handleClose={handleCloseAddStationDialog} />
    </Accordion>
  );
};

const ChargerStations = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Admin | Chargers</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <AppBar position="sticky" className={classes.appBar} >
          <Toolbar variant="dense">
            <Typography variant="h6">
              Flexi Charge
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.contentBox}>
          <Container component="section" className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid item xs={12} md={8} lg={9}>
                <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant="dense">
                    <Typography className={classes.contentTitle} variant="h6">
                      Charger Stations
                    </Typography>
                    <IconButton edge="end"
                      aria-label="charger stations filters"
                      aria-haspopup="true"
                      aria-controls="charger-stations-filters"
                      color="inherit"
                    >
                      <FilterList />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <ChargerStationsSettingsAccordian classes={classes} />
                <Paper elevation={2}>
                  <ChargersTable classes={classes} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <ChargerStationEditPanel />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ChargerStations;