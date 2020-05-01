import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, Grid, FormControl, 
  InputLabel, Select, Tooltip, FormControlLabel, Checkbox, Fade } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

 
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
  }
})); 
const filter = createFilterOptions();

const TextFields = inject("globalStore", "stockStore", "supplierStore", "productStore", "batchStore")(
  observer(({ globalStore, stockStore, supplierStore, productStore, batchStore }) => {
  const classes = useStyles(); 
  const [batchChecked, setBatchChecked] = React.useState(false)
  const [def, setDef] = React.useState(null)
  React.useEffect(() => {

    return () => {
      let defaultOption = (productStore.records !== [] || !productStore.records || productStore.records !== null) ? productStore.records[0] : null
      setDef(defaultOption)
    }
  }, [productStore])
  /**
   *  Function used to change input value
  */
  const handleFieldChange = (e) => {
    const input = e.target
    stockStore.setField(input.name, input.checked ? input.checked : input.value)
    
  }
  const handleBatchSelect = (e) => {
    setBatchChecked(!batchChecked)
  }

  const handleInputValidation = (e) => {
    e.persist()
    const regex = /^[0-9\b]+$/;
    const element = e.target;
    if (element.value === '' || regex.test(element.value)) return stockStore.setField(element.name, element.value)
  }
  return (
    <Grid container spacing={2}>
     <Grid container item xs={6} spacing={1}>
        <Grid item xs={12} md={6} lg={3}>
          <Tooltip title={stockStore.fields[0].label} placement={"top"} size={"small"}>
            <FormControl className={classes.select}>
                <InputLabel id={stockStore.fields[0].label}>{stockStore.fields[0].label}</InputLabel>
                <Select
                  style={{color: stockStore.record[stockStore.fields[0].name] === 1 ? '#04c62b' : '#ff0101'}}
                  variant={"outlined"}
                  className={classes.input}
                  labelId={stockStore.fields[0].label}
                  id={stockStore.fields[0].name}
                  name={stockStore.fields[0].name}
                  required
                  value={stockStore.record[stockStore.fields[0].name]}
                  onChange={handleFieldChange}
                  disabled={stockStore.submiting}
                >
                  <MenuItem value={1}>Entrada</MenuItem>
                  <MenuItem value={2}>Salida</MenuItem>
                </Select>
              </FormControl>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={9}>
          <Tooltip title={stockStore.fields[2].label} placement={"top"}>
              <Autocomplete
                id="combobox-product" 
                options={productStore.records}
                getOptionLabel={(option) => option.name}
                className={classes.select}
                noOptionsText={"No hay opciones"}
                value={def || null}
                getOptionSelected={(option, value) => option.name === value.name}
                onChange={(event, newValue) => {
                  if (!newValue || newValue === null) return
                  stockStore.setField('idProduct', newValue.id)
                }}
                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, className: classes.input }} autoFocus required disabled={stockStore.submiting} size={"small"} label="Producto" variant="outlined" />}
              />
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <Tooltip title={stockStore.fields[1].label} placement={"top"}>
            <Autocomplete
                id="combobox-supplier" 
                options={supplierStore.records}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                className={classes.select}
                name={stockStore.fields[1].name}
                onChange={(event, newValue) => {
                  if (!newValue || newValue === null) return
                  stockStore.setField('idSupplier', newValue.id)
                }}
                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, className: classes.input }} disabled={stockStore.submiting} size={"small"} label="Proveedor" variant="outlined" />}
              />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container item xs={6} spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Tooltip title={stockStore.fields[3].label} placement={"top"}>
            <TextField
              InputProps={{className: classes.input}}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
              required
              name={stockStore.fields[3].name}
              id={stockStore.fields[3].name}
              label={stockStore.fields[3].label}
              color={"secondary"}
              type={"text"}
              size={"small"}
              pattern={"[0-9]*"}
              value={stockStore.record[stockStore.fields[3].name]}
              onChange={handleInputValidation}
              disabled={stockStore.submiting}
              />
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Tooltip title={stockStore.fields[6].label} placement={"top"}>
            <TextField
              InputProps={{className: classes.input}}
              fullWidth
              variant={"outlined"}
              margin={"normal"}
              name={stockStore.fields[6].name}
              id={stockStore.fields[6].name}
              color={"secondary"}
              type={"date"}
              size={"small"}
              value={stockStore.record[stockStore.fields[6].name] || ''}
              onChange={handleFieldChange}
              disabled={stockStore.submiting}
              />
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Tooltip title={"Lote"} placement={"top"}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={batchChecked}
                  onChange={handleBatchSelect}
                  name="loteCheck"
                  color="secondary"
                />
              }
              label={"Lote"}
                />
          </Tooltip>
        </Grid>
        <Fade in={batchChecked}>
          <Grid item xs={12} md={6} lg={10}>
            <Tooltip title={"Lote"} placement={"top"}>
              <Autocomplete
                className={classes.select}
                value={stockStore.record[stockStore.fields[5].name]}
                onChange={(event, newValue) => {
                  if (newValue && newValue.inputValue) {
                    stockStore.setField('idBatch', newValue.inputValue);
                    return;
                  }
                  stockStore.setField('idBatch', newValue);
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      code: `Agregar "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                id={"batch"}
                options={batchStore.records}
                getOptionLabel={(option) => {
                  // e.g value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.code;
                }}
                renderOption={(option) => option.code}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Lote" size={"small"} variant="outlined" InputProps={{ ...params.InputProps, className: classes.input }}/>
                )}
              />
            </Tooltip>
          </Grid>
        </Fade>
      </Grid>
    </Grid>
  )}
))

export default TextFields
