import {
  AppBar, Box, Container, createStyles,
  Grid, IconButton, makeStyles, Theme, Toolbar, Typography,
  Paper,
  styled,
  alpha,
  InputBase
} from '@material-ui/core';
import React, { useState, useRef } from 'react';
import ChargerStationEditPanel from './ChargerStationEditPanel';
import { Helmet } from 'react-helmet';
import { Replay } from '@material-ui/icons';
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  color: 'black',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.flexiCharge.primary.lightGrey, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  backgroundColor: 'transparent',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const ChargerStations = () => {
  const classes = useStyles();
  const [activeStationId, setActiveStationId] = useState<number>();
  const [selectedStations, setSelectedStations] = useState<readonly string[]>([]);
  const stationsTable = useRef(null);
  const handleStationEditClicked = (stationId: number) => {
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
                    <Search color="primary">
                      <SearchIconWrapper>
                        <Search />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                    <IconButton edge="end"
                      aria-label="charger stations filters"
                      aria-haspopup="true"
                      aria-controls="charger-stations-filters"
                      color="inherit"
                      onClick={ () => setActiveStationId(0)}
                    >
                      <Replay />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <ChargerStationsSettingsAccordian selectedStations={selectedStations} />
                <Paper elevation={2}>
                  <ChargerStationsTable ref={stationsTable} setSelectedStations={setSelectedStations} editClicked={handleStationEditClicked} classes={classes} />
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