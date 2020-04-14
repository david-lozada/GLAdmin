import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import alertify from 'alertifyjs'
import { ValidatorForm } from 'react-material-ui-form-validator';

// Components
import TextFields from './TextFields'

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
  button: {
    height: theme.spacing(20),
    textAlign: 'vertical'
  }
}));
const Form = inject("stockStore", "globalStore")(
    observer(({ stockStore, globalStore }) => {
    const classes = useStyles(); 
    /**
     *  Create handle method
    */
    const handleCreateSubmit = (e) => {
      e.preventDefault()
      stockStore.save(stockStore.record).then((res) => {
        stockStore.reset()
        if (res.record){
          stockStore.addRecord(res.record)
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
      stockStore.update(stockStore.record).then(({record, en, es}) => {
        stockStore.reset()
        stockStore.updateRecord(record)
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
    if (stockStore.submiting) {
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
              <Grid item xs={11}> 
                <TextFields/>
              </Grid>
              <Grid item xs={1}>
                <Button
                  className={classes.button}
                  type={"submit"}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={stockStore.submiting}
                >
                  { btnText }
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
    
  })
)
export default Form