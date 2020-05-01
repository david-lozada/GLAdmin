// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Fade } from '@material-ui/core'

// Components
import DataTable from '../components/DataTable'
import Slide from '../components/Slide/'
import useEventListener from '../components/useEventListener'


const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    backgroundColor: theme.palette.primary.darker,
    color: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  gridAnimation: {
    transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp, 
    duration: theme.transitions.duration.leavingScreen,
  })}
}));

const User = inject("userStore", "globalStore", "roleStore")(
  observer(({ userStore, globalStore, roleStore }) => {
    React.useEffect(() => {
      globalStore.swipeInForm()
      userStore.getAllRecords()
      roleStore.getAllRecords()
        .then(() => userStore.setFieldOptions(roleStore.records, 5))
    }, [userStore, roleStore, globalStore])
    globalStore.setModule('Usuario')
    // Get all users
    const NEW_KEYS = ['112', 'F1'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
        globalStore.setIsUpdateSlide(false)
        globalStore.swipeOutForm('Agregar ' + globalStore.module, 'create')
        userStore.reset()
      }
    }
    useEventListener('keydown', handler);

  	const classes = useStyles();
    // console.log(swipe);
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={1}> 
              <Grid item xs={globalStore.gridCells.table}> 
                <DataTable store={"userStore"}/>
              </Grid>
              <Fade in={globalStore.gridCells.isOpen}>
                <Grid item xs={globalStore.gridCells.form}> 
                  <Slide store={"userStore"}/>
                </Grid>
              </Fade>
            </Grid>
        </Container>
    )
})
)

export default withRouter(User)