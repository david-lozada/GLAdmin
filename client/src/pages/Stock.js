// Dependencies
import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography } from '@material-ui/core'

// Components
// import useEventListener from '../components/useEventListener'
import Form from '../components/Stock/Form'
import DataTable from '../components/Stock/Datatable';


const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: theme.spacing(28),
  }
}));

const Stock = inject("stockStore", "globalStore", "supplierStore", "batchStore", "productStore")(
  observer(({ stockStore, globalStore, supplierStore, batchStore, productStore }) => {
    React.useEffect(() => {
      batchStore.getAllRecords()
        .then(() => {
          stockStore.setColumnLookup(batchStore.records, 3)
        })
      supplierStore.getAllRecords()
      productStore.getAllRecords()
        .then(() => {
          stockStore.setColumnLookup(productStore.records, 2)
        })
      stockStore.getAllRecords()
        .then(() => stockStore.setCurrencyFormat(stockStore.records))
      stockStore.reset()
    }, [stockStore, supplierStore, batchStore, productStore])
    globalStore.setModule('Inventario')
    globalStore.setSlideTitle('Movimiento de ' + globalStore.module)
  	const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    // Get all users
   /* const NEW_KEYS = ['112', 'F1'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
      }
    }
    useEventListener('keydown', handler);*/
    return (
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Grid container spacing={2}> 
                  <Grid item xs={12}> 
                    <Typography component="h2" variant="h6" gutterBottom>
                      {globalStore.slideTitle}
                    </Typography>
                    <Form/>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <DataTable store={"stockStore"}/>
            </Grid>
          </Grid>
      </Container>
    )
})
)

export default withRouter(Stock)