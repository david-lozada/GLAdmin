import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import alertify from 'alertifyjs'
import { ValidatorForm } from 'react-material-ui-form-validator';

// Components
import CustomTextField from './CustomTextField'

const useStyles = makeStyles(theme => ({ 
  input: {
    color: '#fff',
    width: theme.spacing(25),
    marginLeft: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(3),
  },
  textInput: {
    color: '#fff',
  },
}));
const Form = inject("userStore", "globalStore")(
    observer(({ store, userStore, globalStore }) => {
    const classes = useStyles();  
    switch(store){
      case 'userStore':
        var Store = userStore
        break
      default:
        return null
    }
    const handleCreateSubmit = (e) => {
      e.preventDefault()
      // if (validate(e.target)) {
        // Call save record method
      /*} else {
        return null
      }*/
      Store.save(Store.record).then((res) => {
        alertify.success(res.es)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    const handleUpdateSubmit = (e) => {
      e.preventDefault()
      alertify.success('Actulizado')
    }
    return <ValidatorForm
                className={classes.form}
                onSubmit={globalStore.formMethod === 'create' ? handleCreateSubmit : handleUpdateSubmit}
                onError={errors => console.log(errors)}
            >
              { Store.fields.map(field => {
                return <CustomTextField store={"userStore"} key={field.label} field={field}/>
                }
              )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={Store.submiting}
            >
              { globalStore.formMethod === 'create' ? 'GUARDAR' : 'ACTUALIZAR' }
            </Button>
          </ValidatorForm>
    
  })
)
export default Form