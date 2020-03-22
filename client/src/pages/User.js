import React from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core'
import DataTable from '../components/DataTable'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const User = inject("userStore", "globalStore")(
  observer(({ userStore, globalStore }) => {
    userStore.getAllUsers()
    .then((res) => {
      console.log(res)
    })
    globalStore.module = 'Usuarios'
  	const classes = useStyles();
  	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
              <DataTable/>
            </Grid>
        </Container>
    )
})
)

export default withRouter(User)
