/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import {
  createStyles, makeStyles, Theme, Box,
  AppBar, Toolbar, Typography, Container, Grid,
  IconButton, Paper, Tab, alpha, InputBase, styled,
  Divider, Select, FormControl, InputLabel, MenuItem,
  Button, TableCell, useTheme
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Replay, ControlPoint } from '@material-ui/icons';
import { ManageUser } from '@/remote-access/types';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import PersonTable from '@/components/pages/invoices/PersonTable';
import PersonTableIndividualInvoice from '@/components/pages/invoices/PersonTableIndividualInvoice';
import { useParams } from 'react-router-dom';
import { manageInvoiceCollection } from '@/remote-access';

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
    contentTitle: {
      flexGrow: 1
    },
    contentSection: {
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    contentContainer: {
      background: 'transparent',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse'
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse'
      }
    },
    contentAppBar: {
      backgroundColor: theme.flexiCharge.primary.white,
      color: theme.flexiCharge.primary.darkGrey,
      fontFamily: theme.flexiCharge.font._main
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
    usernameCell: {
      maxWidth: '15vw'
    },
    tableContainer: {
      maxHeight: '600px',
      marginTop: theme.spacing(1)
    },
    buttonPosition: {
      marginLeft: 'auto',
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

const RenderInvoices = () => {
  const theme: Theme = useTheme();
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState('users');
  let [selectedYear, setYear] = React.useState('2022');
  let [selectedMonth, setMonth] = React.useState('00');

  const handleTabChange = (event: any, newTab: string) => {
    setSelectedTab(newTab);
  };

  const params = useParams();
  const person = (params as any).person;
  const [state, setState] = useState<any>({
    loaded: false,
  });

  const loadPersons = async () => {
    setSelectedTab('view-all-invoices');
    setState({
      ...state,
      loaded: false
    });
  };

  useEffect(() => {
    if (selectedTab === 'all-invoices') {
      loadPersons();
    } else {
      loadPersons();
    }
  }, []);

  const handleSearch = (searchText: string) => {
    if (searchText !== '') {
      const persons = state.persons.filter((person: ManageUser) => {
        return `${person.username}`.includes(searchText)
          || person.name?.toLowerCase().includes(searchText.toLowerCase());
      });
      setState({
        ...state,
        searchText,
        searchedPersons: persons
      });
    } else {
      setState({
        ...state,
        searchText: undefined
      });
    }
  };
  
  const updateSelectedYear = async (event: any) => {
    setYear(() => {
      return selectedYear = event?.target.value
    });
    await handleDateFilter(); 
  } 
  const updateSelectedMonth = async (event: any) => {
    setMonth(() => {
      return selectedMonth = event?.target.value
    });
    await handleDateFilter(); 
  }

  const handleDateFilter = async () => {
    setState({
      ...state,
      loaded: false
    });
    const [invoices, error] = await manageInvoiceCollection.getInvoiceByDate(selectedYear, selectedMonth, 'PAID');
    
    if (invoices) {
      setState({
        loaded: true,
        invoices,
      });
    } else if (error) {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to fetch invoices'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Invoices</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <Box className={classes.contentBox}>
          <Container component="section" className={classes.contentSection} maxWidth={false}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid item xs={12} md={12} lg={12}>
                <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant="dense">
                    <Typography className={classes.contentTitle} variant="h6">
                      <TabContext value={selectedTab}>
                        <TabList onChange={handleTabChange} indicatorColor="primary">
                          <Tab label="View All Invoices" value="view-all-invoices" />
                          <Tab label="Search Specific Invoice" value="search-specific-invoice" />
                        </TabList>
                      </TabContext>
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Divider />
                {selectedTab === 'view-all-invoices' &&
                  <>
                    <Box sx={{ width: '100%', marginTop: '15pt' }}>
                      <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                        <Toolbar>
                          <Box sx={{ width: '15%', marginRight: '10pt', height: '40pt' }}>
                            <FormControl fullWidth >
                              <InputLabel id="demo-simple-select-label">Year</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={updateSelectedYear}
                                label="Year"
                              >
                                <MenuItem value={'2019'}>2019</MenuItem>
                                <MenuItem value={'2020'}>2020</MenuItem>
                                <MenuItem value={'2021'}>2021</MenuItem>
                                <MenuItem value={'2022'}>2022</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box sx={{ width: '15%', height: '40pt' }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Month</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={updateSelectedMonth}
                                label="Month"
                              >
                                <MenuItem value={'01'}>January</MenuItem>
                                <MenuItem value={'02'}>Feburary</MenuItem>
                                <MenuItem value={'03'}>Mars</MenuItem>
                                <MenuItem value={'04'}>April</MenuItem>
                                <MenuItem value={'05'}>May</MenuItem>
                                <MenuItem value={'06'}>June</MenuItem>
                                <MenuItem value={'07'}>July</MenuItem>
                                <MenuItem value={'08'}>August</MenuItem>
                                <MenuItem value={'09'}>September</MenuItem>
                                <MenuItem value={'10'}>October</MenuItem>
                                <MenuItem value={'11'}>November</MenuItem>
                                <MenuItem value={'12'}>December</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <TableCell className={classes.buttonPosition}>
                            <Button
                              startIcon={<ControlPoint />}
                              style={{ color: theme.flexiCharge.primary.white }}
                              variant="contained"
                              color="primary"
                              onClick={() => console.log('btn pressed!')}
                              disabled
                            >
                              Generate Invoices
                            </Button>
                          </TableCell>
                        </Toolbar>
                      </AppBar>
                    </Box>
                    <Paper elevation={2}>
                      <PersonTable
                        classes={classes}
                        invoices={state.invoices}
                        loaded={state.loaded}
                        selectedYear={selectedYear}
                        selectedMonth={selectedMonth}
                      />
                    </Paper>
                  </>
                }
                {selectedTab === 'search-specific-invoice' &&
                  <>
                    <Box sx={{ width: '100%', marginTop: '15pt' }}>
                      <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                        <Toolbar variant='dense'>
                          <Search color="primary">
                            <SearchIconWrapper>
                              <Search />
                            </SearchIconWrapper>
                            <StyledInputBase
                              placeholder="Search users"
                              inputProps={{ 'aria-label': 'search' }}
                              onChange={(e) => { handleSearch(e.target.value); }}
                            />
                          </Search>

                          <IconButton edge='end'
                            aria-label='user invoices filters'
                            aria-haspopup='true'
                            aria-controls='user-invoices-filters'
                            color='inherit'
                          >
                            <Replay />
                          </IconButton>

                        </Toolbar>
                      </AppBar>
                    </Box>
                    <Paper elevation={2}>
                      <PersonTableIndividualInvoice
                        classes={classes}
                        persons={state.searchText !== undefined ? state.searchedPersons : state.persons}
                        loaded={state.loaded}
                        selectedYear={selectedYear}
                        selectedMonth={selectedMonth}
                      />
                    </Paper>
                  </>
                }
                <Paper elevation={2}>
                  <TabContext value={selectedTab}>
                    <TabPanel style={{ padding: 0 }} value="all-invoices">
                      <>
                      </>
                    </TabPanel>
                    <TabPanel style={{ padding: 0 }} value="individual-invoices">
                      <>
                      </>
                    </TabPanel>
                  </TabContext>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                {selectedTab === 'all-invoices' &&
                  <h6>All Invoices</h6>
                }
                {selectedTab === 'individual-invoices' &&
                  <h6>Individual Invoices</h6>
                }
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default RenderInvoices;

