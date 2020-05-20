// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Fade, Slide } from '@material-ui/core'

// Components
import DataTable from '../components/DataTable'
import CustomSlide from '../components/Slide/'
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

const Batch = inject("batchStore", "globalStore")(
  observer(({ batchStore, globalStore }) => {
    React.useEffect(() => {
      globalStore.swipeInForm()
      batchStore.getAllRecords()
    }, [batchStore, globalStore])
    globalStore.setModule('Lote')
    // Get all users
    const NEW_KEYS = ['112', 'F1'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
        globalStore.setIsUpdateSlide(false)
        globalStore.swipeOutForm('Agregar ' + globalStore.module, 'create')
        batchStore.reset()
      }
    }
    useEventListener('keydown', handler);

  	const classes = useStyles();
    return (
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}> 
            <Slide direction="up" in={(globalStore.gridCells.table) ? true : false}>
              <Grid item xs={globalStore.gridCells.table}> 
                <DataTable store={"batchStore"}/>
              </Grid>
            </Slide>
            <Fade in={(globalStore.gridCells.form) ? true : false}>
              <Grid item xs={globalStore.gridCells.form}> 
                <CustomSlide store={"batchStore"}/>
              </Grid>
            </Fade>
          </Grid>
      </Container>
    )
})
)

export default withRouter(Batch)