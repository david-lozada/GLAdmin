import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Tabs, Tab, Typography, Box, IconButton, Button, CircularProgress } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons'
import alertify from 'alertifyjs'
import { ValidatorForm } from 'react-material-ui-form-validator';

// Components
import { TextField1, TextField2, TextField3 } from './TextFields'

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
  button: {
    height: theme.spacing(15),
    marginTop: theme.spacing(2)
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Form = inject("stockStore", "globalStore")(
    observer(({ stockStore, globalStore }) => {
    React.useEffect(() => {
      globalStore.setFormMethod('create')
    }, [globalStore])
    const classes = useStyles(); 
    /**
     *  Create handle method
    */
    const handleCreateSubmit = (e) => {
      e.preventDefault()
      console.log(stockStore.validation)
      if (stockStore.validation.isValid) {
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
      } else {
        console.log(stockStore.validation.errors)
        for (const err of stockStore.validation.errors) {
          alertify.warning(err)
        }
      }
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
     * Method used for tabs
     */
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

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
              <Grid item xs={11} className={classes.paper} style={{height: '100%'}}> 
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label=""
                  >
                    <Tab label="1" {...a11yProps(0)} />
                    <Tab label="2" {...a11yProps(1)} />
                    <Tab label="3" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <TextField1/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TextField2/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <TextField3/>
                </TabPanel>
              </Grid>
              <Grid item xs={1} className={classes.paper}> 
                <IconButton aria-label="delete" onClick={stockStore.reset}>
                  <AddIcon color={"secondary"}/>
                </IconButton>
                <Grid item xs={12}>
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
            </Grid>
          </ValidatorForm>
    
  })
)
export default Form