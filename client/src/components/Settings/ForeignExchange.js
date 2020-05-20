import React from 'react';
import { observer, inject } from "mobx-react"
import alertify from 'alertifyjs'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Tooltip, TextField } from '@material-ui/core';


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
    // padding: theme.spacing(3),
  },
  input: {
    color: '#fff'
  },
  subtitle: {
    color: theme.palette.primary.light,
  }
}));

const ForeignExchange = inject("sttForeignExchangeStore")(
  observer(({ sttForeignExchangeStore }) => {
    const classes = useStyles(); 
    const [inputEnable, setInputEnable] = React.useState(false)
    /**
     *  Create handle method
    */
    const handleCreateSubmit = (e) => {
      e.preventDefault()
      sttForeignExchangeStore.save(sttForeignExchangeStore.record)
        .then((res) => {
          alertify.success(res.es)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    /**
     *  Function used to change input value
    */
    const handleInputValidation = (e) => {
	    e.persist()
	    const regex = /^[0-9\b]+$/;
	    const element = e.target;
	    if (element.value === '' || regex.test(element.value)) return sttForeignExchangeStore.setField(element.name, parseInt(element.value))
	}

    return (
      <React.Fragment>
        <form
            className={classes.root}
            onSubmit={handleCreateSubmit}
        >
        <Grid container spacing={1}> 
          <Grid item xs={12} className={classes.paper} style={{height: '100%'}}> 
              <Tooltip title={"Valor dólar"} placement={"top"}>
                <TextField
                  className={classes.input}
                  variant={"outlined"}
                  margin={"normal"}
                  name={"foreignExchange"}
                  id={"foreignExchange"}
                  autoFocus
                  label={"Valor dólar"}
                  size={"small"}
                  color={"secondary"}
                  type={"text"}
              	  pattern={"[0-9]*"}
                  onClick={() => setInputEnable(true)}
                  value={sttForeignExchangeStore.record.foreignExchange}
                  InputProps={{className: classes.input}}
                  onChange={handleInputValidation}
                  disabled={inputEnable || sttForeignExchangeStore.submiting}
                />
               </Tooltip>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    )
})
)

export default ForeignExchange;