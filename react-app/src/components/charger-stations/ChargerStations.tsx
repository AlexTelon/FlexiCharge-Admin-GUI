import {
  AppBar, Box, Container, createStyles,
  Grid, IconButton, makeStyles, Theme, Toolbar, Typography,
  Accordion, AccordionDetails, AccordionSummary, AccordionActions,
  Button, Divider, Paper
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { ExpandMore, FilterList } from '@material-ui/icons';
import React, { useState } from 'react';
import ChargerStationEditPanel from './ChargerStationEditPanel';
import AddSingleStationDialog from './AddStationDialog';
import ChargerStationsTable from './ChargerStationTable';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
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
    buttonDark: {
      color: theme.flexiCharge.accent.primary
    },
    buttonLight: {
      color: theme.flexiCharge.primary.white
    }
  })
);

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
  const [activeStationId, setActiveStationId] = useState<string>();

  const handleStationEditClicked = (stationId: string) => {
    setActiveStationId(stationId);
  };
  return (
    <>
      <Helmet>
        <title>Admin | Chargers</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
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
                  <ChargerStationsTable editClicked={handleStationEditClicked} classes={classes} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <ChargerStationEditPanel stationId={activeStationId} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ChargerStations;