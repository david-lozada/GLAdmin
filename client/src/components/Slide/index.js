import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Slide, Typography, Grid, IconButton } from '@material-ui/core';
import { observer, inject } from "mobx-react"
import { Close } from "@material-ui/icons"

// Components
import Form from './Form'

const useStyles = makeStyles(theme => ({ 
  root: {
    display: 'flex',
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: theme.spacing(70),
  },
}));

const Drawer = inject("userStore", "globalStore")(
  observer(({ store, userStore, globalStore }) => {
  const classes = useStyles();  
  return (
    <Slide direction="left" in={globalStore.gridCells.isOpen} mountOnEnter unmountOnExit>
      <Paper className={classes.paper} variant={"outlined"}>
        <Grid container spacing={1}> 
          <Grid item xs={11}> 
            <Typography component="h2" variant="h6" gutterBottom>
              {globalStore.slideTitle}
            </Typography>
          </Grid>
          <Grid item xs={1}> 
            <IconButton aria-label="delete" onClick={globalStore.swipeInForm}>
              <Close color={"secondary"}/>
            </IconButton>
          </Grid>
        </Grid>
        <Form store={"userStore"}/>
      </Paper>
    </Slide>
  );
})
)
export default Drawer