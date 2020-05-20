import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, MenuItem, TextField, Tooltip } from '@material-ui/core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import FileBase from 'react-file-base64';
// import numeral from 'numeral'
 
const useStyles = makeStyles(theme => ({ 
  input: {
    color: '#fff',
    width: theme.spacing(31),
    marginRight: theme.spacing(1),
    // marginTop: theme.spacing(2),
  },
  select: {
    color: '#fff',
    width: theme.spacing(31),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}));
const CustomTextField = inject("userStore", "globalStore", "customerStore", "supplierStore", "companyStore", "taxStore", "productStore", "batchStore")(
    observer(({ store, customerStore, userStore, globalStore, supplierStore, companyStore, taxStore, productStore, batchStore, field, index }) => {
    const classes = useStyles();  
    var Store
    switch(store){
      case 'userStore':
        Store = userStore
        break
      case 'customerStore':
        Store = customerStore
        break
      case 'supplierStore':
        Store = supplierStore
        break
      case 'companyStore':
        Store = companyStore
        break
      case 'taxStore':
        Store = taxStore
        break
      case 'productStore':
        Store = productStore
        break
      case 'batchStore':
        Store = batchStore
        break
      default:
        return null
    } 
    /**
     *  Function used to change input value
    */
    const handleFieldChange = (e) => {
    	const input = e.target
    	Store.setField(input.name, input.checked ? input.checked : input.value)
    }
     // function to capture base64 format of an image
    const handleFile = (files) => {
      productStore.setFiles(files)
    }

    const required = field.rules.split('|')[0] === 'required'
    switch(field.type) {
      case 'checkbox':
        return <Tooltip title={field.label} placement={"top"}>
                <FormControlLabel
                  key={field.name}
                  className={classes.input}
                  control={
                    <Checkbox
                        disabled={Store.submiting}
                        color="secondary"
                        name={field.name}
                        id={field.name}
                        onChange={handleFieldChange}
                        value={Store.record[field.name]}
                        checked={Store.record[field.name] || true}
                    />
                  }
                  label={field.label}
                />
              </Tooltip>
      case 'password':
        if (globalStore.formMethod === 'create') {
          return <Tooltip title={field.label} placement={"top"}>
                  <TextValidator
                    validators={['required']}
                    errorMessages={['Campo requerido']}
                    variant={"outlined"}
                    margin={"normal"}
                    name={field.name}
                    id={field.name}
                    type={"password"}
                    label={field.label}
                    autoComplete={field.name}
                    color={"secondary"}
                    value={Store.record[field.name] || ''}
                    InputProps={{className: classes.input}}
                    onChange={handleFieldChange}
                    disabled={Store.submiting}
                  />
                </Tooltip>
        } else {
          return <Tooltip title={field.label} placement={"top"}>
                  <TextField
                    variant={"outlined"}
                    margin={"normal"}
                    name={field.name}
                    id={field.name}
                    type={"password"}
                    label={field.label}
                    autoComplete={field.name}
                    color={"secondary"}
                    value={Store.record[field.name] || ''}
                    InputProps={{className: classes.input}}
                    onChange={handleFieldChange}
                    disabled={Store.submiting}
                  />
                </Tooltip>
        }
      case 'email':
        return <Tooltip title={field.label} placement={"top"}>
                <TextValidator
                  validators={ required ? ['required', 'isEmail'] : ['isEmail']}
                  errorMessages={ required ? ['Campo requerido', 'Correo inválido'] : ['Correo inválido']}
                  variant={"outlined"}
                  margin={"normal"}
                  name={field.name}
                  id={field.name}
                  label={field.label}
                  autoComplete={field.name}
                  color={"secondary"}
                  value={Store.record[field.name]}
                  InputProps={{className: classes.input}}
                  onChange={handleFieldChange}
                  disabled={Store.submiting}
                 />
                </Tooltip>
      case 'select':
        return <Tooltip title={field.label} placement={"top"}>
                <SelectValidator
                  select
                  disabled={Store.submiting}
                  label={field.label}
                  variant={"outlined"}
                  onChange={handleFieldChange}
                  name={field.name}
                  id={field.name}
                  validators={['required']}
                  errorMessages={['Campo requerido']}
                  InputProps={{className: classes.select}}
                  value={Store.record[field.name] || ''}
                  >
                  <MenuItem value={''}>Seleccione {field.label}</MenuItem>
                  {
                    field.options.length > 0 ? (
                      field.options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                      ))
                    ) : (null)
                  }
                </SelectValidator>
              </Tooltip>
      case 'number':
        return <Tooltip title={field.label} placement={"top"}>
                <TextValidator
                  validators={ required ? ['required'] : []}
                  errorMessages={ required ? ['Campo requerido'] : []}
                  variant={"outlined"}
                  margin={"normal"}
                  name={field.name}
                  id={field.name}
                  autoFocus={index === 0 ? true : false}
                  label={field.label}
                  autoComplete={field.name}
                  color={"secondary"}
                  type={"number"}
                  value={Store.record[field.name] || ''}
                  InputProps={{className: classes.input}}
                  onChange={handleFieldChange}
                  disabled={Store.submiting}
                />
                </Tooltip>
      case 'currency':
        return <Tooltip title={field.label} placement={"top"}>
                <TextValidator
                  validators={ required ? ['required'] : []}
                  errorMessages={ required ? ['Campo requerido'] : []}
                  variant={"outlined"}
                  margin={"normal"}
                  name={field.name}
                  id={field.name}
                  autoFocus={index === 0 ? true : false}
                  label={field.label}
                  autoComplete={field.name}
                  color={"secondary"}
                  type={"text"}
                  value={Store.record[field.name]}
                  InputProps={{className: classes.input}}
                  onChange={handleFieldChange}
                  disabled={Store.submiting}
                />
                </Tooltip>
      case 'file':
        return <Tooltip title={field.label} placement={"top"}>
                <FileBase
                  name={field.name}
                  id={field.name}
                  multiple={ false }
                  onDone={ handleFile }
                  disabled={Store.submiting}
                  value={Store.record[field.name] || ''}
                  />
              </Tooltip>
      default:
        return <Tooltip title={field.label} placement={"top"}>
                <TextValidator
                  validators={ required ? ['required'] : []}
                  errorMessages={ required ? ['Campo requerido'] : []}
                  variant={"outlined"}
                  margin={"normal"}
                  name={field.name}
                  id={field.name}
                  autoFocus={index === 0 ? true : false}
                  label={field.label}
                  autoComplete={field.name}
                  color={"secondary"}
                  value={Store.record[field.name] || ''}
                  InputProps={{className: classes.input}}
                  onChange={handleFieldChange}
                  disabled={Store.submiting}
                />
              </Tooltip>
    }
})
)

export default CustomTextField;
