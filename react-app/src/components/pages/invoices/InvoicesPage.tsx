/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import {
  createStyles, makeStyles, Theme, Box,
  AppBar, Toolbar, Typography, Container, Grid,
  IconButton, Paper, Tab, alpha, InputBase, styled,
  Divider, Select, FormControl, InputLabel, MenuItem,
  Button, TableCell, useTheme, Menu
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { ControlPoint, Search } from '@material-ui/icons';

import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import PersonTable from '@/components/pages/invoices/PersonTable';
import PersonTableIndividualInvoice from '@/components/pages/invoices/PersonTableIndividualInvoice';
import { useParams } from 'react-router-dom';
import { manageInvoice } from '@/remote-access';

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

const SearchBar = styled('div')(({ theme }) => ({
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
  const [selectedTab, setSelectedTab] = React.useState('view-invoices-by-date');
  let [selectedYear, setYear] = React.useState('2000');
  let [selectedMonth, setMonth] = React.useState('00');
  let [selectedStatus, setSelectedStatus] = React.useState('ALL');
  let [searchValue, setSearchValue] = React.useState('')

  const handleTabChange = async (event: any, newTab: string) => {
      resetYear();
      resetMonth();
      resetStatus();
      handleDateFilter();
      setSelectedTab(newTab);
  };

  const params = useParams();
  const person = (params as any).person;
  const [state, setState] = useState<any>({
    loaded: true,
    invoices: [],
  });

  useEffect(() => {
    handleDateFilter();
  }, [selectedYear, selectedMonth, selectedStatus]);

  useEffect(() => {
    setYear('2000');
    setMonth('00');
    setSelectedStatus('ALL');
  }, []);  

  const handleSearch = async (searchText: string) => {
    if (searchText !== '') {
      setState({
        ...state,
        loaded: false
      });
      const [individualInvoices, error] = await manageInvoice.getInvoiceByUserId(searchText, 'paid')
      if(individualInvoices){
        setState({
        ...state,
        loaded: true,
        searchText,
        individualInvoices
        });
      }
    } else {
      setState({
        ...state,
        searchText: undefined
      });
    }
  };
  
  const resetYear = () => {
    setYear(() => {
      return selectedYear = '2000'
    })
  }
  const resetMonth = () => {
    setMonth(() => {
      return selectedMonth = '00'
    })
  }
  const resetStatus = () => {
    setSelectedStatus(() => {
      return selectedStatus = 'ALL'
    })
  }

  const updateSelectedYear = async (event: any) => {
    setYear(event?.target.value);
    await handleDateFilter(); 
  } 
  const updateSelectedMonth = async (event: any) => {
    setMonth(event?.target.value);
    await handleDateFilter(); 
  }
  const upDateSelectedStatus = async (event: any) => {
    setSelectedStatus(event?.target.value);
    await handleDateFilter(); 
  }

  const handleDateFilter = async () => {
    setState({
      ...state,
      loaded: false
    });

    const yearFilter = selectedYear !== '2000' ? selectedYear : '';
    const monthFilter = selectedMonth !== '00' ? selectedMonth : '';
    const statusFilter = selectedStatus !== 'ALL' ? selectedStatus : '';

    const [invoices, error] = await manageInvoice.getInvoiceByDate(yearFilter, monthFilter, statusFilter);
    
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
                          <Tab label="View Invoices By Date" value="view-invoices-by-date" />
                          <Tab label="Search Specific Invoice" value="search-specific-invoice" />
                        </TabList>
                      </TabContext>
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Divider />
                {selectedTab === 'view-invoices-by-date' &&
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
                                <MenuItem value={'2000'}>All</MenuItem>
                                <MenuItem value={'2019'}>2019</MenuItem>
                                <MenuItem value={'2020'}>2020</MenuItem>
                                <MenuItem value={'2021'}>2021</MenuItem>
                                <MenuItem value={'2022'}>2022</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box sx={{ width: '15%', marginRight: '10pt', height: '40pt' }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Month</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={updateSelectedMonth}
                                label="Month"
                              >
                                <MenuItem value={'00'}>All</MenuItem>
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
                          <Box sx={{ width: '15%', height: '40pt' }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Status</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={upDateSelectedStatus}
                                label="Status"
                              >
                                <MenuItem value={'PAID'}>Paid</MenuItem>
                                <MenuItem value={'NOT-PAID'}>Not paid</MenuItem>
                                <MenuItem value={'ALL'}>All</MenuItem>
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
                          <SearchBar color="primary">
                            <SearchIconWrapper>
                              <Search />
                            </SearchIconWrapper>
                            <StyledInputBase
                              placeholder="Search users"
                              inputProps={{ 'aria-label': 'search' }}
                              onChange={ e =>
                                setSearchValue(e.target.value)
                              }
                              onKeyDown={ e => {
                                if(e.key === 'Enter'){
                                  handleSearch(searchValue)
                                }
                              }}
                            />
                          </SearchBar>

                          <IconButton edge='end'
                            aria-label='user invoices filters'
                            aria-haspopup='true'
                            aria-controls='user-invoices-filters'
                            color='inherit'
                          >
                            <Search />
                          </IconButton>

                        </Toolbar>
                      </AppBar>
                    </Box>
                    <Paper elevation={2}>
                      <PersonTableIndividualInvoice
                        classes={classes}
                        individualInvoices={state.individualInvoices}
                        loaded={state.loaded}
                      />
                    </Paper>
                  </>
                }
                <Paper elevation={2}>
                  <TabContext value={selectedTab}>
                    <TabPanel style={{ padding: 0 }} value="invoices-by-date">
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
                {selectedTab === 'invoices-by-date' &&
                  <h6>Invoices By Date</h6>
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

