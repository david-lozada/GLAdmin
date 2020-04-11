import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import alertify from 'alertifyjs'
import { ValidatorForm } from 'react-material-ui-form-validator';

// Components
import CustomTextField from './CustomTextField'

const useStyles = makeStyles(theme => ({ 
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
    padding: theme.spacing(3),
  },
  input: {
    color: '#fff',
    width: theme.spacing(25),
    marginLeft: theme.spacing(1),
  },
}));
const Form = inject("userStore", "globalStore", "customerStore", "supplierStore", "companyStore", "taxStore")(
    observer(({ store, userStore, globalStore, customerStore, supplierStore, companyStore, taxStore }) => {
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
      default:
        return null
    }
    /**
     *  Create handle method
    */
    const handleCreateSubmit = (e) => {
      e.preventDefault()
      Store.save(Store.record).then((res) => {
        Store.reset()
        if (res.record){
          Store.addRecord(res.record)
        }
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
      Store.update(Store.record).then(({record, en, es}) => {
        Store.reset()
        Store.updateRecord(record)
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
    if (Store.submiting) {
      btnText = <CircularProgress color={"secondary"}/>
    } else {
      if (globalStore.formMethod === 'create') {
        btnText = 'GUARDAR'
      } else {
        btnText = 'ACTUALIZAR'
      }
    }
    return <ValidatorForm
                className={classes.root}
                onSubmit={globalStore.formMethod === 'create' ? handleCreateSubmit : handleUpdateSubmit}
                onError={errors => console.log(errors)}
            >
            <Grid container spacing={1}> 
              <Grid item xs={12}> 
                { Store.fields.map((field, i) => {
                  return <CustomTextField store={store} key={field.label} field={field} index={i}/>
                  })
                }
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  type={"submit"}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={Store.submiting}
                >
                  { btnText }
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
    
  })
)
export default Form