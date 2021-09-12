import {
  AppBar, Box, Checkbox, Container, createStyles,
  Grid, IconButton, makeStyles, Paper, Table, TableCell,
  TableHead, TableRow, Theme, Toolbar, Typography,
  Accordion, AccordionDetails, AccordionSummary, AccordionActions, Button, Divider, TextField, TableBody, Menu, MenuItem, TablePagination, TableContainer
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Close, ExpandMore, FilterList, MoreVert, RadioButtonChecked } from '@material-ui/icons';
import React, { useState } from 'react';

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
      position: 'absolute',
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
      backgroundColor: 'transparent'
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
    chargerInfoPaper: {
      height: '100%',
      '& > *': {
        width: '100%'
      }
    },
    chargerInfoAppBar: {
      backgroundColor: theme.flexiCharge.primary.white,
      color: theme.flexiCharge.primary.darkGrey
    },
    chargerInfoInputField: {
      marginBottom: theme.spacing(2)
    },
    chargerTable: {
      height: '100%',
      maxHeight: '100%',
      overflow: 'auto'
    },
    maxHeight: {
      height: '100%',
      maxHeight: '100%'
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
          <Grid container>
            <Grid item sm={3}>
            </Grid>
          </Grid>
          <IconButton
            aria-label="charger actions"
            aria-haspopup="true"
            onClick={props.handleClick}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

const ChargersPage = () => {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    // 
  };

  const chargerCells = [];
  for (let i = 0; i < 6; i++) {
    chargerCells.push(<ChargerTableCell handleClick={handleClick} />);
  }
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
          <Container maxWidth={false} className={classes.maxHeight}>
            <Grid container spacing={1} className={`${classes.contentContainer}`}>
              <Grid item sm={9} className={classes.maxHeight}>
                <AppBar position="static" className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant="dense">
                    <Typography className={classes.contentTitle} variant="h6">
                      Chargers
                    </Typography>
                    <IconButton edge="end"
                      aria-label="chargers filters"
                      aria-haspopup="true"
                      aria-controls="chargers-filters"
                      color="inherit"
                    >
                      <FilterList />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="chargers-actions-panel"
                    id="chargers-actions-panel-header"
                  >
                    <div className="col-11">
                      <Typography>
                        0 Selected
                      </Typography>
                    </div>
                    <div className="col-1">
                      More Actions
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="col-9"></div>
                    <div className="col-4">
                      <Typography variant="caption">
                        Perform actions on all selected chargers
                        <br />
                      </Typography>
                    </div>
                  </AccordionDetails>
                  <Divider />
                  <AccordionActions>
                    <Button className={classes.buttonDark}>
                          Add Multiple
                    </Button>
                    <Button variant="contained" className={classes.buttonLight} color='primary'>
                          Add Charger
                    </Button>
                  </AccordionActions>
                </Accordion>
                <Paper className={classes.chargerTable}>
                  <TableContainer className={classes.maxHeight}>
                    <Table stickyHeader aria-aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox className={classes.checkBox} />
                          </TableCell>
                          <TableCell>
                            Charger ID
                          </TableCell>
                          <TableCell>
                            Status
                          </TableCell>
                          <TableCell align="right">
                            Action
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
                  <Menu
                    id="charger-action-menu"
                    anchorEl={anchorElement}
                    keepMounted
                    open={Boolean(anchorElement)}
                    onClose={handleClose}
                  >
                    <MenuItem>
                      <RadioButtonChecked color="primary" />
                      &nbsp;Set Online
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <RadioButtonChecked color="error" />
                      &nbsp;Set Offline
                    </MenuItem>
                    <Divider />
                    <MenuItem>Delete</MenuItem>
                  </Menu>
                </Paper>
              </Grid>
              <Grid item sm={3}>
                <Paper className={classes.chargerInfoPaper}>
                  <AppBar position="static" className={classes.chargerInfoAppBar} elevation={0}>
                    <Toolbar variant="dense">
                      <Typography className={classes.contentTitle} variant="h5">
                        Charger Info
                      </Typography>
                      <IconButton
                        aria-label="deselect charger"
                        aria-controls="charger-info"
                      >
                        <Close />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                  <Divider />
                  <form>
                    <Box sx={{ p: 2 }}>
                      <TextField 
                        className={classes.chargerInfoInputField}
                        required
                        id="charger-id"
                        label="Charger ID"
                        variant="filled"
                        size="small"
                        inputProps={{ maxLength: 6 }}
                        fullWidth
                      />

                      <TextField 
                        className={classes.chargerInfoInputField}
                        required
                        id="charger-type"
                        label="Charger Type"
                        variant="filled"
                        size="small"
                        inputProps={{ maxLength: 6 }}
                        fullWidth
                      />
                      <TextField 
                        className={classes.chargerInfoInputField}
                        required
                        id="charger-longitude"
                        label="Longitude"
                        type="number"
                        variant="filled"
                        size="small"
                        inputProps={{ maxLength: 6 }}
                        fullWidth
                      />
                      <TextField 
                        className={classes.chargerInfoInputField}
                        required
                        id="charger-latitude"
                        label="Latitude"
                        type="number"
                        variant="filled"
                        size="small"
                        inputProps={{ maxLength: 6 }}
                        fullWidth
                      />
                      <TextField 
                        className={classes.chargerInfoInputField} 
                        required
                        id="charger-street-address"
                        label="Street Address"
                        variant="filled"
                        size="small"
                        inputProps={{ maxLength: 6 }}
                        fullWidth
                      />
                      <TextField
                        className={classes.chargerInfoInputField}
                        required
                        id="charger-town"
                        label="Town"
                        variant="filled"
                        size="small"
                        inputProps={{ maxLength: 6 }}
                        fullWidth
                      />
                    </Box>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ChargersPage;