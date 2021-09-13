import {
  AppBar, Box, Checkbox, Container, createStyles,
  Grid, IconButton, makeStyles, Table, TableCell,
  TableHead, TableRow, Theme, Toolbar, Typography,
  Accordion, AccordionDetails, AccordionSummary, AccordionActions,
  Button, Divider, TableBody, TablePagination, TableContainer, Paper
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Edit, ExpandMore, FilterList } from '@material-ui/icons';
import React from 'react';
import ChargerStationEditPanel from './ChargerStationEditPanel';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appBar: {
      backgroundColor: theme.flexiCharge.accent.primary,
      color: theme.flexiCharge.primary.white,
      fontFamily: theme.flexiCharge.font._main
    },
    contentBox: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(8),
      width: '100%',
      height: '100%',
      maxHeight: '100%',
      top: 0
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
      maxHeight: '600px'
    }
  })
);

const ChargerTableCell = (props: any) => {
  return (
    <>
      <TableRow
        hover
        key="meep"
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
            >
              123456
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          Busy
        </TableCell>
        <TableCell align="right">
          <Button className={props.classes.buttonDark} color="primary">
            Manage Chargers
          </Button>
          <Button startIcon={<Edit />} className={props.classes.buttonLight} variant="contained" color="primary">
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

const ChargersTable = ({ classes }: any) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    // 
  };

  const chargerCells = [];
  for (let i = 0; i < 12; i++) {
    chargerCells.push(<ChargerTableCell classes={classes} />);
  }
  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-aria-label="sticky table">
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={chargerCells.length}
        rowsPerPage={6}
        page={1}
        onPageChange={handleChangePage}
      />
    </>
  );
};

const ChargerStationsSettingsAccordian = ({ classes }: any) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="chargers-actions-panel"
        id="chargers-actions-panel-header"
      >
        <Grid container>
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
        <Button className={classes.buttonDark}>
              Add Multiple
        </Button>
        <Button variant="contained" className={classes.buttonLight} color='primary'>
              Add Station
        </Button>
      </AccordionActions>
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
        <AppBar position="static" className={classes.appBar} >
          <Toolbar variant="dense">
            <Typography variant="h6">
              Flexi Charge
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.contentBox}>
          <Container component="section" maxWidth={false}>
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