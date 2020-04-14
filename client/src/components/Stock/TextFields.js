import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, MenuItem, TextField } from '@material-ui/core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';

 
const useStyles = makeStyles(theme => ({ 
  input: {
    color: '#fff',
    // marginTop: theme.spacing(2),
  },
}));
const CustomTextField = inject("globalStore", "stockStore")(
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
      <React.Fragment>
        <TextValidator
          validators={['required']}
          errorMessages={['Campo requerido']}
          variant={"standard"}
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
         />
         <TextValidator
          validators={['required']}
          errorMessages={['Campo requerido']}
          variant={"standard"}
          margin={"normal"}
          name={stockStore.fields[1].name}
          id={stockStore.fields[1].name}
          label={stockStore.fields[1].label}
          autoComplete={stockStore.fields[1].name}
          color={"secondary"}
          value={stockStore.record[stockStore.fields[1].name]}
          InputProps={{className: classes.input}}
          onChange={handleFieldChange}
          disabled={stockStore.submiting}
         />
         <TextValidator
          validators={['required']}
          errorMessages={['Campo requerido']}
          variant={"standard"}
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
         <TextValidator
          validators={['required']}
          errorMessages={['Campo requerido']}
          variant={"standard"}
          margin={"normal"}
          name={stockStore.fields[3].name}
          id={stockStore.fields[3].name}
          label={stockStore.fields[3].label}
          autoComplete={stockStore.fields[3].name}
          color={"secondary"}
          type={"number"}
          value={stockStore.record[stockStore.fields[3].name]}
          InputProps={{className: classes.input}}
          onChange={handleFieldChange}
          disabled={stockStore.submiting}
         />

         <TextValidator
          validators={['required']}
          errorMessages={['Campo requerido']}
          variant={"standard"}
          margin={"normal"}
          name={stockStore.fields[4].name}
          id={stockStore.fields[4].name}
          label={stockStore.fields[4].label}
          autoComplete={stockStore.fields[4].name}
          color={"secondary"}
          type={"number"}
          value={stockStore.record[stockStore.fields[4].name]}
          InputProps={{className: classes.input}}
          onChange={handleFieldChange}
          disabled={stockStore.submiting}
         />

         <TextValidator
          validators={['required']}
          errorMessages={['Campo requerido']}
          variant={"standard"}
          margin={"normal"}
          name={stockStore.fields[5].name}
          id={stockStore.fields[5].name}
          label={stockStore.fields[5].label}
          autoComplete={stockStore.fields[5].name}
          color={"secondary"}
          type={"number"}
          value={stockStore.record[stockStore.fields[5].name]}
          InputProps={{className: classes.input}}
          onChange={handleFieldChange}
          disabled={stockStore.submiting}
         />

         <TextValidator
          validators={['required']}
          errorMessages={['Campo requerido']}
          variant={"standard"}
          margin={"normal"}
          name={stockStore.fields[6].name}
          id={stockStore.fields[6].name}
          label={stockStore.fields[6].label}
          autoComplete={stockStore.fields[6].name}
          color={"secondary"}
          type={"number"}
          value={stockStore.record[stockStore.fields[6].name]}
          InputProps={{className: classes.input}}
          onChange={handleFieldChange}
          disabled={stockStore.submiting}
         />

          <FormControlLabel
            className={classes.input}
            control={
              <Checkbox
                disabled={stockStore.submiting}
                color="secondary"
                name={"available"}
                id={"available"}
                onChange={handleFieldChange}
                value={stockStore.record[stockStore.fields[7].name]}
                checked={stockStore.record[stockStore.fields[7].name] ? true : false}
              />
            }
            label={"Disponible"}
          />
        </React.Fragment>
    )}
))


export default CustomTextField;
