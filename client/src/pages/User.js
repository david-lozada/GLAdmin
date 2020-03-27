// Dependencies
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid/*, Button*/ } from '@material-ui/core'
import alertify from 'alertifyjs'

// Components
import DataTable from '../components/DataTable'
import Drawer from '../components/Drawer'
import useEventListener from '../components/useEventListener'


const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    backgroundColor: theme.palette.primary.darker,
    color: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
// Set columns for table and fields for form
const column = [
    { title: "#", field: "id" },
    { title: "Nombre", field: "firstName" },
    { title: "Apellido", field: "lastName" },
    { title: "Correo", field: "email" },
    { title: "Contraseña", field: "password" },
    { title: "Rol", field: "idRole", lookup: { 1: "Master", 2: "Administrador", 3: "Empleado" }},
    { title: "Disponible", field: "available", type: "boolean" },
];

const User = inject("userStore", "globalStore")(
  observer(({ userStore, globalStore }) => {
    const [swipe, setSwipe] = useState({
      table: 11,
      form: 1,
      changed: false
    });
    // Get all users
    useEffect(() => {
      userStore.getAllUsers()

    }, [userStore])
    const NEW_KEYS = ['16', 'Shift'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
        showForm()
      }
    }
    useEventListener('keydown', handler);

    // Set values for table and form grids
    const showForm = () => {
      if (swipe.changed) {
        setSwipe({
          table: 11,
          form: 1,
          changed: false
        })
      } else {
        setSwipe({
          table: 6,
          form: 6,
          changed: true
        })
      }
    }
    globalStore.setModule('Usuarios')
  	const classes = useStyles();
    // console.log(swipe);
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={1}> 
              <Grid item xs={swipe.table}> 
                <DataTable column={column} data={userStore.records} module={globalStore.module} showForm={showForm}/>
              </Grid>
              <Grid item xs={swipe.form}> 
                <Drawer store={userStore} open={swipe.changed} fields={column} title={'Agregar Usuario'}/>
              </Grid>
            </Grid>
        </Container>
    )
})
)

export default withRouter(User)