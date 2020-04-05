import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Slide, Typography } from '@material-ui/core';
import { observer, inject } from "mobx-react"

// Components
import Form from './Form'

const useStyles = makeStyles(theme => ({ 
  root: {
    display: 'flex',
  },
  paper: {
    backgroundColor: theme.palette.primary.darker,
    color: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: theme.spacing(67),
  },
}));

const Drawer = inject("userStore", "globalStore")(
  observer(({ store, userStore, globalStore }) => {
  const classes = useStyles();  
  return (
    <Slide direction="left" in={globalStore.gridCells.isOpen} mountOnEnter unmountOnExit>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h6" className={classes.textInput} gutterBottom>
          {globalStore.slideTitle}
        </Typography>
          <Form store={"userStore"}/>
      </Paper>
    </Slide>
  );
})
)
export default Drawer