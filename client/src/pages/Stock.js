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
import CustomDialog from '../components/Stock/CustomDialog';


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
  },
  dialog: {
    backgroundColor: theme.palette.primary.dark,
  }
}));

const Stock = inject("stockStore", "globalStore", "supplierStore", "batchStore", "productStore")(
  observer(({ stockStore, globalStore, supplierStore, batchStore, productStore }) => {
    const classes = useStyles();
    React.useEffect(() => {
      //Fetch all records from batch table
      batchStore.getAllRecords()
        .then(() => {
          //Set lookup for batch column
          stockStore.setColumnLookup(batchStore.records, 3, "code") 
        })
      //Fetch all suppliers from db
      supplierStore.getAllRecords()
       //Fetch all products from db
      productStore.getAllRecords()
       //Fetch all stocks from db
      stockStore.getAllRecords()
      return () => {
        //Clear all
        stockStore.reset()
      }
    }, [stockStore, supplierStore, batchStore, productStore])
    //Set module name
    globalStore.setModule('Inventario')
    //Set name of form
    globalStore.setSlideTitle('Movimiento de ' + globalStore.module)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
            <CustomDialog store={stockStore}/>
          </Grid>
      </Container>
    )
})
)

export default withRouter(Stock)