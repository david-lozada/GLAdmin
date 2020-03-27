import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, Slide, FormControlLabel, Checkbox, 
  Typography, Slider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({ 
  root: {
    display: 'flex',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(3),
  },
  paper: {
    backgroundColor: theme.palette.primary.darker,
    color: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: theme.spacing(55),
  },
  input: {
    color: '#fff',
    width: theme.spacing(25),
    marginLeft: theme.spacing(1),
  },
  textInput: {
    color: '#fff',
  }
}));
export default function Drawer({ store, open, fields, title }) {
  // Store attributes
  const { record, save, reset, saveLoading } = store
  const classes = useStyles();  
  const handleInputChange = e => {
    record[e.target.name] = e.target.value
  }
  const handleCreateSubmit = (e) => {
    e.preventDefault()
    save(record)
    reset()
  }
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h6" className={classes.textInput} gutterBottom>
          {title}
        </Typography>
        <form className={classes.form} onSubmit={handleCreateSubmit} noValidate>
          { fields.map(field => {
            switch (field.field) {
              case 'id':
                return null
              case 'password':
                return <TextField
                        key={field.field}
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.input}
                        type="password"
                        id={field.field}
                        label={field.title}
                        name={field.field}
                        autoComplete={field.field}
                        value={record[field]} 
                        onChange={handleInputChange}
                        color="secondary"
                        InputProps={{className: classes.textInput}}
                      />
              case 'email':
                return <TextField
                        key={field.field}
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.input}
                        type="email"
                        id={field.field}
                        label={field.title}
                        name={field.field}
                        autoComplete={field.field}
                        value={record[field]} 
                        onChange={handleInputChange}
                        color="secondary"
                        InputProps={{className: classes.textInput}}
                      />
              case 'available':
                return <FormControlLabel
                        key={field.field}
                        className={classes.input}
                        control={
                          <Checkbox
                            id={field.field}
                            name={field.field}
                            onChange={handleInputChange}
                            color="secondary"
                            checked={record[field]} 
                          />
                        }
                        label={field.title}
                      />
                case 'idRole':
                  return <Fragment key={field.field}>
                          <Typography id="discrete-slider" gutterBottom>
                            Master &nbsp;&nbsp; -&nbsp;&nbsp; Administrador &nbsp;&nbsp; -&nbsp;&nbsp; Empleado
                          </Typography>
                          <Slider
                            color="secondary"
                            defaultValue={3}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={3}
                          />
                        </Fragment>
              default:
                return <TextField
                        key={field.field}
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.input}
                        id={field.field}
                        label={field.title}
                        name={field.field}
                        autoComplete={field.field}
                        autoFocus
                        value={record[field]} 
                        onChange={handleInputChange}
                        color="secondary"
                        InputProps={{className: classes.textInput}}
                      />
            }
          }) }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={saveLoading}
          >
            GUARDAR
          </Button>
        </form>
      </Paper>
    </Slide>
  );
}