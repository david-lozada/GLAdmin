// Dependencies
import React from 'react';
import clsx from 'clsx';
import alertify from 'alertifyjs'
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Add as AddIcon, Save as SaveIcon, } from '@material-ui/icons'
import { Container, Grid, Paper, Typography, IconButton, CircularProgress, 
  Slide, Tooltip } from '@material-ui/core';

// Components
// import useEventListener from '../components/useEventListener'
import { TextFields1, TextFields2 } from '../components/PurchaseOrder/TextFields'
import DataTable from '../components/PurchaseOrder/DataTable';
import DetailDataTable from '../components/PurchaseOrder/DetailDataTable';
// import CustomDialog from '../components/PurchaseOrder/CustomDialog';


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
  },
  root: {
    color: theme.palette.secondary.main,
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(4)
  },
}));

const PurchaseOrder = inject("purchaseOrderStore", "globalStore", "supplierStore", "productStore")(
  observer(({ purchaseOrderStore, globalStore, supplierStore, productStore }) => {
    const classes = useStyles();
    React.useEffect(() => {
      globalStore.setFormMethod('create')
      //Fetch all suppliers from db
      supplierStore.getAllRecords()
       //Fetch all products from db
      productStore.getAllRecords()
       //Fetch all stocks from db
      purchaseOrderStore.getAllRecords()
      return () => {
        //Clear all
        purchaseOrderStore.reset()
      }
    }, [purchaseOrderStore, supplierStore, productStore, globalStore])
    globalStore.setModule('Pedido a Proveedor')
    /**
     *  Create handle method
    */
    const handleCreateSubmit = (e) => {
      e.preventDefault()
      purchaseOrderStore.save(purchaseOrderStore.record)
        .then((res) => {
          purchaseOrderStore.reset()
          if (res.record){
            purchaseOrderStore.addRecord(res.record)
          }
          purchaseOrderStore.reset()
          alertify.success(res.es)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    /**
     *  Update handle method
    */
    const handleUpdateSubmit = (e) => {
      e.preventDefault()
      purchaseOrderStore.update(purchaseOrderStore.record).then(({record, en, es}) => {
        purchaseOrderStore.reset()
        purchaseOrderStore.updateRecord(record)
        globalStore.setFormMethod('create')
        globalStore.setSlideTitle('Agregar ' + globalStore.module)
        alertify.success(es)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    /**
     *  Used to define submit button text
    */
    var btnText
    if (purchaseOrderStore.submiting) {
      btnText = <CircularProgress color={"secondary"}/>
    } else {
      btnText = <SaveIcon color={"secondary"}/>
    }
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}> 
            <Slide direction="left" in={(purchaseOrderStore.grid.create) ? true : false} mountOnEnter unmountOnExit>
              <Grid item xs={purchaseOrderStore.grid.create}> 
                <DataTable store={"purchaseOrderStore"}/>
              </Grid>
            </Slide>
            <Slide direction="left" in={(purchaseOrderStore.grid.table) ? true : false} mountOnEnter unmountOnExit>
              <Grid item xs={purchaseOrderStore.grid.table}> 
                <Grid container spacing={2}>
                  {/* Form */}
                  <ValidatorForm
                      className={classes.root}
                      onSubmit={globalStore.formMethod === 'create' ? handleCreateSubmit : handleUpdateSubmit}
                      onError={errors => console.log(errors)}
                  >
                    <Grid container spacing={2}> 
                      <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                          <Grid container spacing={2}> 
                            <Grid item xs={12}> 
                              <Typography component="h2" variant="h6" gutterBottom>
                                Proveedor
                              </Typography>
                              <TextFields1/>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={5} lg={5}>
                        <Paper className={fixedHeightPaper}>
                          <Grid container spacing={2}> 
                            <Grid item xs={12}> 
                              <Typography component="h2" variant="h6" gutterBottom>
                                Producto
                              </Typography>
                              <TextFields2/>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={1} className={classes.buttonContainer}> 
                        <Tooltip title={"Limpiar campos"} placement={"top"}>
                          <IconButton aria-label="Nuevo" onClick={purchaseOrderStore.reset()}>
                            <AddIcon color={"secondary"}/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"Guardar"} placement={"top"}>
                          <IconButton color="primary" aria-label="Guardar" disabled={purchaseOrderStore.submiting} type={"submit"}>
                            { btnText }
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </Grid>
                <Grid container spacing={2}>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                      <DetailDataTable store={"purchaseOrderStore"}/>
                  </Grid>
                  {/*<CustomDialog store={purchaseOrderStore}/>*/}
                </Grid>
              </Grid>
            </Slide>
          </Grid>
      </Container>
    )
})
)

export default withRouter(PurchaseOrder)