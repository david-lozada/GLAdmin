import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, MenuItem, TextField } from '@material-ui/core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';

 
const useStyles = makeStyles(theme => ({ 
  input: {
    color: '#fff',
    width: theme.spacing(31),
    marginRight: theme.spacing(1),
    // marginTop: theme.spacing(2),
  },
}));
const CustomTextField = inject("userStore", "globalStore", "customerStore", "supplierStore")(
    observer(({ store, customerStore, userStore, globalStore, supplierStore, field, index }) => {
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
    const required = field.rules.split('|')[0] === 'required'
    switch(field.type) {
      case 'checkbox':
        return <FormControlLabel
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
                        checked={Store.record[field.name] ? true : false}
                    />
                  }
                  label={field.label}
                />
      case 'password':
        if (globalStore.formMethod === 'create') {
          return <TextValidator
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
        } else {
          return <TextField
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
        }
      case 'email':
        return <TextValidator
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
      case 'select':
        return  <SelectValidator
                select
                disabled={Store.submiting}
                label={field.label}
                variant={"outlined"}
                value={Store.record[field.name]}
                onChange={handleFieldChange}
                name={field.name}
                id={field.name}
                validators={['required']}
                errorMessages={['Campo requerido']}
                InputProps={{className: classes.input}}
                >
                  <MenuItem value={''}>Seleccione Ocupación</MenuItem>
                  <MenuItem value={1}>Master</MenuItem>
                  <MenuItem value={2}>Administrador</MenuItem>
                  <MenuItem value={3}>Empleado</MenuItem>
                </SelectValidator>
      default:
        return <TextValidator
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
                  value={Store.record[field.name]}
                  InputProps={{className: classes.input}}
                  onChange={handleFieldChange}
                  disabled={Store.submiting}
                />
    }
})
)

export default CustomTextField;
