import React from 'react';
import { useHistory } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import alertify from 'alertifyjs'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: '70px',
    width: '70px',
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = inject("userStore", "authStore", "globalStore")(
  observer(({ authStore, userStore, globalStore }) => {
  const history = useHistory();
  const classes = useStyles();
  const { values, inProgress } = authStore;
  const handleUserNameChange = e => {
      authStore.setUserName(e.target.value);
  };

  const handlePasswordChange = e => {
      authStore.setPassword(e.target.value);
  };

  const handleSubmit = e => {
      e.preventDefault();
      if (!authStore.values.username || !authStore.values.password) {
          alertify.warning('Campos requeridos')
      }
      authStore.login()
      .then(() => {
        history.push("/home/dashboard")
      })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize="large"/>
        </Avatar>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Usuario"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={values.username} 
            disabled={inProgress}
            onChange={handleUserNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={inProgress}
            value={values.password} 
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={inProgress}
          >
            INGRESAR
          </Button>
        </form>
      </div>
      
    </Container>
  )
})
)
export default Login

