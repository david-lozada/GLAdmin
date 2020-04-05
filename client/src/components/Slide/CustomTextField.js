import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, MenuItem } from '@material-ui/core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';

 
const useStyles = makeStyles(theme => ({ 
  input: {
    color: '#fff',
    width: theme.spacing(31),
    marginRight: theme.spacing(1),
  },
}));
const CustomTextField = inject("userStore", "globalStore")(
    observer(({ store, userStore, globalStore, field }) => {
    const classes = useStyles();  
    switch(store){
      case 'userStore':
        var Store = userStore
        break
      default:
        return null
    } 
    const handleFieldChange = (e) => {
    	const input = e.target
    	Store.setField(input.name, input.checked ? input.checked : input.value)
    }
    const checkbox = field.rules.split('|').includes('boolean')
    const email = field.rules.split('|').includes('email')
    const required = field.rules.split('|')[0] === 'required'
    if(checkbox) {
    	return <FormControlLabel
                  key={field.name}
                  className={classes.input}
                  control={
                    <Checkbox
                      	color="secondary"
        				        name={field.name}
        				        id={field.name}
                      	onChange={handleFieldChange}
			          	      value={Store.record[field.name]}
                    />
                  }
                  label={field.label}
                />
    } else if (email) {
    	return  <TextValidator
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
  			       />
    }else if (field.name === 'idRole') {
    	return  <SelectValidator
        				select
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
    } else if (field.name === 'password'){
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
			        value={Store.record[field.name]}
			        InputProps={{className: classes.input}}
		          onChange={handleFieldChange}
			    />
    } else {
    	return <TextValidator
			        validators={ required ? ['required'] : null}
              errorMessages={ required ? ['Campo requerido'] : null}
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
			    />
    }
})
)

export default CustomTextField;
