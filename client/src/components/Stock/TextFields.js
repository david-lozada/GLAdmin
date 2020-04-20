import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, MenuItem, TextField, Grid, FormControl, 
  InputLabel, Select, Tooltip } from '@material-ui/core';
import { TextValidator } from 'react-material-ui-form-validator';
import FileBase from 'react-file-base64';
import numeral from 'numeral'

 
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

const TextField1 = inject("globalStore", "stockStore", "supplierStore", "taxStore")(
  observer(({ globalStore, stockStore, supplierStore, taxStore }) => {
  const classes = useStyles(); 
  /**
   *  Function used to change input value
  */
  const handleFieldChange = (e) => {
    const input = e.target
    stockStore.setField(input.name, input.checked ? input.checked : input.value)
    
  }
  return (
    <Grid container spacing={1}>
     <Grid container item xs={12} spacing={1}>
        <Grid item xs={2}>
          <Tooltip title={stockStore.fields[0].label} placement={"top"}>
            <TextValidator
              validators={['required']}
              errorMessages={['Campo requerido']}
              variant={"outlined"}
              margin={"normal"}
              name={stockStore.fields[0].name}
              id={stockStore.fields[0].name}
              label={stockStore.fields[0].label}
              autoComplete={stockStore.fields[0].name}
              color={"secondary"}
              value={stockStore.record[stockStore.fields[0].name]}
              InputProps={{className: classes.input}}
              onChange={handleFieldChange}
              disabled={stockStore.submiting}
              autoFocus={true}
              />
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Tooltip title={stockStore.fields[1].label} placement={"top"}>
              <TextValidator
              className={classes.input}
              validators={['required']}
              errorMessages={['Campo requerido']}
              variant={"outlined"}
              margin={"normal"}
              name={stockStore.fields[1].name}
              id={stockStore.fields[1].name}
              label={stockStore.fields[1].label}
              autoComplete={stockStore.fields[1].name}
              color={"secondary"}
              value={stockStore.record[stockStore.fields[1].name]}
              onChange={handleFieldChange}
              disabled={stockStore.submiting}
              />
          </Tooltip>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title={stockStore.fields[5].label} placement={"top"}>
            <FormControl className={classes.select}>
              <InputLabel id={stockStore.fields[5].label}>{stockStore.fields[5].label}</InputLabel>
              <Select
                variant={"outlined"}
                labelId={stockStore.fields[5].label}
                id={stockStore.fields[5].name}
                name={stockStore.fields[5].name}
                value={stockStore.record[stockStore.fields[5].name]}
                onChange={handleFieldChange}
                disabled={stockStore.submiting}
              >
                  <MenuItem value={stockStore.record[stockStore.fields[5].name]}>Seleccione Impuesto</MenuItem>
              {
                taxStore.records.map((record) => (
                  <MenuItem key={record.name+record.id} value={record.id}>{record.name}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>
          <Grid item xs={2}>
            <Tooltip title={stockStore.fields[4].label} placement={"top"}>
              <FormControl className={classes.select}>
                <InputLabel id={stockStore.fields[4].label}>{stockStore.fields[4].label}</InputLabel>
                <Select
                  variant={"outlined"}
                  labelId={stockStore.fields[4].label}
                  id={stockStore.fields[4].name}
                  name={stockStore.fields[4].name}
                  value={stockStore.record[stockStore.fields[4].name]}
                  onChange={handleFieldChange}
                  disabled={stockStore.submiting}
                >
                  <MenuItem value={stockStore.record[stockStore.fields[4].name]}>Seleccione Proveedor</MenuItem>
                {
                  supplierStore.records.map((record) => (
                    <MenuItem key={record.firstName+record.id} value={record.id}>{record.firstName + ' ' + record.lastName}</MenuItem>
                  ))
                }
                </Select>
              </FormControl>
            </Tooltip>
          </Grid>
        <Grid item xs={3}>
          <Tooltip title={stockStore.fields[3].label} placement={"top"}>
            <TextField
            className={classes.input}
            variant={"outlined"}
            margin={"normal"}
            name={stockStore.fields[3].name}
            id={stockStore.fields[3].name}
            label={stockStore.fields[3].label}
            color={"secondary"}
            type={"date"}
            defaultValue={stockStore.record[stockStore.fields[3].name]}
            onChange={handleFieldChange}
            disabled={stockStore.submiting}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )}
))

const TextField2 = inject("globalStore", "stockStore")(
    observer(({ globalStore, stockStore }) => {
      const classes = useStyles(); 
    /**
     *  Function used to change input value
    */
    const handleFieldChange = (e) => {
    	const input = e.target
    	stockStore.setField(input.name, input.checked ? input.checked : input.value)
    }
     // function to capture base64 format of an image
    const handleFile = (files) => {
      stockStore.setFiles(files)
    }
    return (
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6}>
            <Tooltip title={stockStore.fields[2].label} placement={"top"}>
              <FileBase
                name={stockStore.fields[2].name}
                id={stockStore.fields[2].name}
                multiple={ false }
                onDone={ handleFile }
                className={classes.file}
                disabled={stockStore.submiting}
                />
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title={stockStore.fields[9].label} placement={"top"}>
              <TextValidator
                validators={['required']}
                errorMessages={['Campo requerido']}
                variant={"outlined"}
                margin={"normal"}
                name={stockStore.fields[9].name}
                id={stockStore.fields[9].name}
                label={stockStore.fields[9].label}
                autoComplete={stockStore.fields[9].name}
                color={"secondary"}
                value={numeral(stockStore.record[stockStore.fields[9].name]).format('0,0')}
                className={classes.input}
                onChange={handleFieldChange}
                disabled={stockStore.submiting}
                />
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip title={stockStore.fields[10].label} placement={"top"}>
             <TextField
              className={classes.input}
              variant={"outlined"}
              margin={"normal"}
              name={stockStore.fields[10].name}
              id={stockStore.fields[10].name}
              label={stockStore.fields[10].label}
              autoComplete={stockStore.fields[10].name}
              color={"secondary"}
              type={"text"}
              value={numeral(stockStore.record[stockStore.fields[10].name]).format( '0,0')}
              InputProps={{className: classes.input}}
              onChange={handleFieldChange}
              disabled={stockStore.submiting}
             />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    )}
))

const TextField3 = inject("globalStore", "stockStore")(
  observer(({ globalStore, stockStore }) => {
    const classes = useStyles(); 
  /**
   *  Function used to change input value
  */
  const handleFieldChange = (e) => {
    const input = e.target
    stockStore.setField(input.name, input.checked ? input.checked : input.value)
  }
  return (
    <Grid container spacing={1}>
      <Grid container item xs={11} spacing={1}>
      <Grid item xs={2}>
        <Tooltip title={stockStore.fields[2].label} placement={"top"}>
          <TextValidator
            validators={['required']}
            errorMessages={['Campo requerido']}
            variant={"outlined"}
            margin={"normal"}
            name={stockStore.fields[2].name}
            id={stockStore.fields[2].name}
            label={stockStore.fields[2].label}
            autoComplete={stockStore.fields[2].name}
            color={"secondary"}
            value={stockStore.record[stockStore.fields[2].name]}
            InputProps={{className: classes.input}}
            onChange={handleFieldChange}
            disabled={stockStore.submiting}
            />
        </Tooltip>
      </Grid>
        <Grid item xs={8}>
          <Tooltip title={stockStore.fields[6].label} placement={"top"}>
           <TextField
            className={classes.input}
            variant={"outlined"}
            margin={"normal"}
            name={stockStore.fields[6].name}
            id={stockStore.fields[6].name}
            label={stockStore.fields[6].label}
            autoComplete={stockStore.fields[6].name}
            color={"secondary"}
            type={"text"}
            value={stockStore.record[stockStore.fields[6].name]}
            InputProps={{className: classes.input}}
            onChange={handleFieldChange}
            disabled={stockStore.submiting}
           />
          </Tooltip>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title={stockStore.fields[8].label} placement={"top"}>
           <FormControlLabel
              control={
                <Checkbox
                  disabled={stockStore.submiting}
                  color="secondary"
                  name={"available"}
                  id={"available"}
                  onChange={handleFieldChange}
                  value={stockStore.record[stockStore.fields[8].name]}
                  checked={stockStore.record[stockStore.fields[8].name] ? true : false}
                />
              }
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )}
))

export {
  TextField1,
  TextField2,
  TextField3
};
