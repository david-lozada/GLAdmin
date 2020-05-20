import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Tooltip, CircularProgress, IconButton } from '@material-ui/core';
import { Add as AddIcon, Save as SaveIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'
import Autocomplete from '@material-ui/lab/Autocomplete';

 
const useStyles = makeStyles(theme => ({ 
  input: {
    color: '#fff',
    width: '100%'
    // marginTop: theme.spacing(2),
  },
  select: {
    color: '#fff',
    marginTop: theme.spacing(2),
    width: '100%'
  }, 
  checkbox: {
    paddingTop: theme.spacing(2),
  }
})); 

const TextFields1 = inject("globalStore", "purchaseOrderStore", "supplierStore")(
  observer(({ globalStore, purchaseOrderStore, supplierStore }) => {
  const classes = useStyles(); 
  const [supplier, setSupplier] = React.useState({ address: '', documentNumber: '' })
  /**
   *  Function used to change input value
  */
  const handleFieldChange = (event, newValue) => {
    if (!newValue || newValue === null) return
    purchaseOrderStore.setField('idSupplier', newValue.id)
    setSupplier({address: newValue.address, documentNumber: newValue.documentNumber})
  }
  return (
    <Grid container spacing={2}>
     <Grid container item xs={12} spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Tooltip title={purchaseOrderStore.fields[0].label} placement={"top"}>
            <Autocomplete
                id={purchaseOrderStore.fields[0].name}
                options={supplierStore.records}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                className={classes.select}
                name={purchaseOrderStore.fields[0].name}
                value={purchaseOrderStore.setAutocompleteValue(supplierStore.records, purchaseOrderStore.record.idSupplier) || null}
                onChange={handleFieldChange}
                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, className: classes.input }} disabled={purchaseOrderStore.submiting} size={"small"} label="Proveedor" variant="outlined" />}
              />
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Tooltip title={purchaseOrderStore.fields[1].label} placement={"top"}>
            <TextField
              InputProps={{className: classes.input}}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
              name={purchaseOrderStore.fields[1].name}
              id={purchaseOrderStore.fields[1].name}
              label={purchaseOrderStore.fields[2].label}
              color={"secondary"}
              type={"text"}
              size={"small"}
              value={supplier.documentNumber}
              disabled={purchaseOrderStore.submiting}
              readOnly
              />
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Tooltip title={purchaseOrderStore.fields[2].label} placement={"top"}>
            <TextField
              InputProps={{className: classes.input}}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
              name={purchaseOrderStore.fields[2].name}
              id={purchaseOrderStore.fields[2].name}
              label={purchaseOrderStore.fields[2].label}
              color={"secondary"}
              type={"text"}
              size={"small"}
              value={supplier.address}
              disabled={purchaseOrderStore.submiting}
              readOnly
              />
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )}
))

const TextFields2 = inject("globalStore", "purchaseOrderStore", "productStore")(
  observer(({ globalStore, purchaseOrderStore, productStore }) => {
  const classes = useStyles(); 
  const [product, setProduct] = React.useState({ code: '' })
  /**
   *  Function used to change input value
  */
  const handleFieldChange = (event, newValue) => {
    if (!newValue || newValue === null) return
    purchaseOrderStore.setField('idProduct', newValue.id)
    setProduct({ code: newValue.code })
    purchaseOrderStore.addRecordDetail(newValue)
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
  return (
    <Grid container spacing={2}>
     <Grid container item xs={11} spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Tooltip title={purchaseOrderStore.fields[3].label} placement={"top"}>
              <Autocomplete
                id={purchaseOrderStore.fields[3].name}
                options={productStore.records}
                getOptionLabel={(option) => option.name}
                className={classes.select}
                noOptionsText={"No hay opciones"}
                getOptionSelected={(option, value) => option.name === value.name}
                value={purchaseOrderStore.setAutocompleteValue(productStore.records, purchaseOrderStore.record.idProduct) || null}
                onChange={handleFieldChange}
                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, className: classes.input }} autoFocus required disabled={purchaseOrderStore.submiting} size={"small"} label="Producto" variant="outlined" />}
              />
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Tooltip title={purchaseOrderStore.fields[4].label} placement={"top"}>
            <TextField
              InputProps={{className: classes.input}}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
              required
              name={purchaseOrderStore.fields[4].name}
              id={purchaseOrderStore.fields[4].name}
              label={purchaseOrderStore.fields[4].label}
              color={"secondary"}
              type={"text"}
              size={"small"}
              pattern={"[0-9]*"}
              value={product.code}
              disabled={purchaseOrderStore.submiting}
              />
          </Tooltip>
        </Grid>
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
        <Tooltip title={"Regresar"} placement={"top"}>
          <IconButton color="primary" aria-label="Regresar" disabled={purchaseOrderStore.submiting} onClick={purchaseOrderStore.moveGrids()}>
            <ChevronLeftIcon color={"secondary"}/>
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )}
))
 
export {
  TextFields1,
  TextFields2
}
