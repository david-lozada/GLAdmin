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
  container: {
    alignContent: "flex-end"
  },
  /*button: {
    zIndex: 1,
    transform: 'translateY(250%)'
  },*/
  input: {
    color: '#fff',
    width: theme.spacing(25),
    marginLeft: theme.spacing(1),
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
    /**
     *  Create handle method
    */
    const handleCreateSubmit = (e) => {
      e.preventDefault()
      Store.save(Store.record).then(({user, en, es}) => {
        Store.reset()
        Store.addRecords(user)
        alertify.success(es)
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
      Store.update(Store.record).then(({user, en, es}) => {
        Store.reset()
        Store.updateRecords(user)
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