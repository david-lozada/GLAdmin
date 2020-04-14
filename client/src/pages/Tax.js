// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core'

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

const Tax = inject("taxStore", "globalStore")(
  observer(({ taxStore, globalStore }) => {
    React.useEffect(() => {
      taxStore.getAllRecords()
    }, [taxStore])
    globalStore.setModule('Impuesto')
    // Get all users
    const NEW_KEYS = ['112', 'F1'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
        globalStore.setIsUpdateSlide(false)
        globalStore.swipeOutForm('Agregar ' + globalStore.module, 'create')
        taxStore.reset()
      }
    }
    useEventListener('keydown', handler);

  	const classes = useStyles();
    return (
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}> 
            <Grid item xs={globalStore.gridCells.table}> 
              <DataTable store={"taxStore"}/>
            </Grid>
            <Grid item xs={globalStore.gridCells.form}> 
              <Slide store={"taxStore"}/>
            </Grid>
          </Grid>
      </Container>
    )
})
)

export default withRouter(Tax)