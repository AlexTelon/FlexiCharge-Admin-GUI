/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import {
  AppBar, Box, Container, createStyles,
  Grid, IconButton, makeStyles, Theme, Toolbar, Typography,
  Paper,
  styled,
  alpha,
  InputBase
} from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import ChargerPointEditPanel from './ChargePointEditPanel';
import { Helmet } from 'react-helmet';
import { Replay } from '@material-ui/icons';
import ChargerPointsTable from './ChargePointTable';
import ChargerPointsSettingsAccordian from './ChargePointsSettingsAccordian';
import { manageChargerPoint } from '@/remote-access';
import { ChargePoint } from '@/remote-access/types';

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

const ChargePoints = () => {
  const classes = useStyles();
  const [state, setState] = useState<any>({
    loaded: false
  });
  const [searchedChargerPoints, setSearchedChargerPoints] = useState<ChargePoint[]>([]);
  const [search, setSearch] = useState<string>();
  const [activeChargerPointId, setActiveChargerPointId] = useState<number>();
  const [selectedChargerPoints, setSelectedChargerPoints] = useState<readonly string[]>([]);
  const chargerPointsTable = useRef(null);

  const handleChargerPointEditClicked = (chargerPointId: number) => {
    setActiveChargerPointId(chargerPointId);
  };

  const handleSearch = (searchText: string) => {
    setSearch(searchText);
    if (searchText !== '') {
      const chargePoints = state.chargePoints.filter((chargePoint: ChargePoint) => {
        return chargePoint.chargePointID === Number(searchText)
          || chargePoint.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setSearchedChargerPoints(chargePoints);
    } else {
      setSearch(undefined);
      loadChargerPoints();
    }
  };

  const loadChargerPoints = () => {
    setState({
      ...state,
      loaded: false
    });
    manageChargerPoint.getAllChargerPoints().then((chargePoints) => {
      setState({
        loaded: true,
        chargePoints
      });
    }).catch((_) => {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to load chargePoints'
      });
    });
  };

  useEffect(() => {
    loadChargerPoints();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin | Chargers</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <Box className={classes.contentBox}>
          <Container component="section" className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid
                item
                xs={12}
                md={activeChargerPointId ? 8 : 12}
                lg={activeChargerPointId ? 9 : 12}
              >
                <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant="dense">
                    <Typography className={classes.contentTitle} variant="h6">
                      Charge Points
                    </Typography>
                    <Search color="primary">
                      <SearchIconWrapper>
                        <Search />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => { handleSearch(e.target.value); }}
                        value={search}
                      />
                    </Search>
                    <IconButton edge="end"
                      aria-label="charger chargePoints reload"
                      aria-haspopup="true"
                      aria-controls="charger-chargePoints-reload"
                      color="inherit"
                      onClick={() => { loadChargerPoints(); setSearch(undefined); }}
                    >
                      <Replay />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <ChargerPointsSettingsAccordian reload={loadChargerPoints} selectedChargerPoints={selectedChargerPoints} />
                <Paper elevation={2}>
                  <ChargerPointsTable loaded={state.loaded} chargePoints={search !== undefined ? searchedChargerPoints : state.chargePoints} ref={chargerPointsTable} setSelectedChargerPoints={setSelectedChargerPoints} editClicked={handleChargerPointEditClicked} classes={classes} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <ChargerPointEditPanel reload={loadChargerPoints} chargerPointId={activeChargerPointId} setActiveChargerPointId={setActiveChargerPointId} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ChargePoints;