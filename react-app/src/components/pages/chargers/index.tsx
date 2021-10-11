import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AppBar, Box, createStyles, makeStyles, Theme, Toolbar, Typography, Container, Grid, IconButton, Paper } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import ChargerTable from './page-components/ChargerTable';
import ChargerEditPanel from './page-components/ChargerEditPanel';

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

const ChargersPage = (props: any) => {
  const stationId = props.stationId;
  console.log(stationId);
  const classes = useStyles();
  const [activeChargerID, setActiveChargerID] = useState<number>();
  const editClicked = (chargerID: number) => {
    setActiveChargerID(chargerID);
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
              <Grid item xs={12} md={8} lg={9}>
                <AppBar position='static' className={classes.contentAppBar} elevation={1}>
                  <Toolbar variant='dense'>
                    <Typography className={classes.contentTitle} variant='h6'>Chargers</Typography>
                    <IconButton edge='end'
                      aria-label='charger stations filters'
                      aria-haspopup='true'
                      aria-controls='charger-stations-filters'
                      color='inherit'>
                      <FilterList />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Paper elevation={2}>
                  <ChargerTable classes={classes} editClicked={editClicked} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                {activeChargerID &&
                  <ChargerEditPanel chargerID={activeChargerID} />
                }
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>);
};
 
export default ChargersPage;