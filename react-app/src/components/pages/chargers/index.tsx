import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AppBar, Box, createStyles, makeStyles, Theme, Toolbar, Typography, Container, Grid, IconButton, Paper, alpha, InputBase, styled } from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import ChargerTable from './page-components/ChargerTable';
import ChargerEditPanel from './page-components/ChargerEditPanel';
import { useParams } from 'react-router-dom';
import ChargerStationAccordian from './page-components/ChargerStationAccordian';
import { manageCharger } from '@/remote-access';
import { Charger } from '@/remote-access/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const ChargersPage = (props: any) => {
  const params = useParams();
  const stationId = (params as any).stationId;
  const classes = useStyles();
  const [state, setState] = useState<any>({
    loaded: false
  });
  const [activeChargerID, setActiveChargerID] = useState<number>();
  const editClicked = (chargerID: number) => {
    setActiveChargerID(chargerID);
  };

  const loadChargers = async () => {
    setState({
      ...state,
      loaded: false
    });
    const [chargers, error] = await manageCharger.getAllChargers(Number(stationId));
    if (chargers) {
      setState({
        loaded: true,
        chargers
      });
    } else if (error) {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to fetch chargers'
      });
    }
  };

  useEffect(() => {
    loadChargers();
  }, []);

  const handleSearch = (searchText: string) => {
    if (searchText !== '') {
      const chargers = state.chargers.filter((charger: Charger) => {
        return `${charger.chargerID}`.includes(searchText)
          || charger.serialNumber?.toLowerCase().includes(searchText.toLowerCase());
      });
      setState({
        ...state,
        searchText,
        searchedChargers: chargers
      });
    } else {
      setState({
        ...state,
        searchText: undefined
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin | Chargers</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <Box className={classes.contentBox}>
          <Container component='section' className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid
                item xs={12}
                md={activeChargerID !== undefined ? 8 : 12}
                lg={activeChargerID !== undefined ? 9 : 12}
              >
                <AppBar position='static' className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant='dense'>
                    <Typography className={classes.contentTitle} variant='h6'>Chargers</Typography>
                    <Search color="primary">
                      <SearchIconWrapper>
                        <Search />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => { handleSearch(e.target.value); }}
                      />
                    </Search>
                    <IconButton edge='end'
                      aria-label='charger stations filters'
                      aria-haspopup='true'
                      aria-controls='charger-stations-filters'
                      color='inherit'
                      onClick={loadChargers}
                    >
                      <Replay />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                {stationId &&
                  <ChargerStationAccordian stationId={stationId} reload={loadChargers} />
                }
                <Paper elevation={2}>
                  <ChargerTable
                    classes={classes}
                    editClicked={editClicked}
                    chargers={state.searchText !== undefined ? state.searchedChargers : state.chargers}
                    loaded={state.loaded}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                {activeChargerID &&
                  <ChargerEditPanel
                    chargerID={activeChargerID}
                    setActiveChargerID={setActiveChargerID}
                    reload={loadChargers}
                  />
                }
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>);
};

export default ChargersPage;