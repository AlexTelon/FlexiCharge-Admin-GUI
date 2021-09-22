import {
  AppBar, Box, Container, createStyles,
  Grid, IconButton, makeStyles, Theme, Toolbar, Typography,
  Paper
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { FilterList } from '@material-ui/icons';
import React, { useState } from 'react';
import ChargerStationEditPanel from './ChargerStationEditPanel';
import ChargerStationsTable from './ChargerStationTable';
import ChargerStationsSettingsAccordian from './ChargerStationsSettingsAccordian';

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
    }
  })
);

const ChargerStations = () => {
  const classes = useStyles();
  const [activeStationId, setActiveStationId] = useState<string>();
  const [selectedStations, setSelectedStations] = useState<readonly string[]>([]);

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
                <ChargerStationsSettingsAccordian selectedStations={selectedStations} />
                <Paper elevation={2}>
                  <ChargerStationsTable setSelectedStations={setSelectedStations} editClicked={handleStationEditClicked} classes={classes} />
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