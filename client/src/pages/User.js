// Dependencies
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid/*, Button*/ } from '@material-ui/core'

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
}));

const User = inject("userStore", "globalStore")(
  observer(({ userStore, globalStore }) => {
    globalStore.setModule('Usuarios')
    // Get all users
    useEffect(() => {
      userStore.getAllUsers()

    }, [userStore])
    const NEW_KEYS = ['112', 'F1'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
        userStore.reset()
        globalStore.swipeForm('Agregar Usuario', 'create')
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
              <Grid item xs={globalStore.gridCells.form}> 
                <Slide store={"userStore"}/>
              </Grid>
            </Grid>
        </Container>
    )
})
)

export default withRouter(User)