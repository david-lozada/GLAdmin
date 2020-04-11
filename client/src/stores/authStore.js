import { decorate, observable, action } from "mobx";
import alertify from 'alertifyjs'

// Stores
import globalStore from "./globalStore";
import axios from "../axios";
import userStore from "./userStore";

class AuthStore {
  inProgress = false;
  errors = '';
  values = {
    username: '',
    password: '',
  };
  setUserName(username) {
    this.values.username = username;
  }
  setPassword(password) {
    this.values.password = password;
  }
  reset() {
    this.values.username = '';
    this.values.password = '';
  }
  login() {
    this.inProgress = true;
    this.errors = undefined;
    return axios.Auth.login(this.values.username, this.values.password)
      .then(( res ) => {
        globalStore.setToken(res.authToken.token)
        userStore.pullUser()
        let user = res.user
        delete user.id
        delete user.password
        window.localStorage.setItem('userData', JSON.stringify(user))
      })
      .catch(action((err) => {
        /* TODO: Display response data in alert */
        alertify.error('Error en datos ingresados')
      }))
      .finally(action(() => { this.inProgress = false; }));
  }
  logout() {
    return axios.Auth.logout()
    .then(( res ) =>  {
      window.localStorage.clear()
    })
    .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
    }))
  }
  
}
decorate(AuthStore, {
    inProgress: observable,
    errors: observable,
    values: observable,
    setUsername: action,
    setPassword: action,
    reset: action,
    login: action,
    logout: action
})
export default new AuthStore();