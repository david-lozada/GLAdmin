import { decorate, observable, action } from "mobx";

// Stores
import userStore from './userStore';
import globalStore from "./globalStore";
import Axios from "axios";

class AuthStore {
  inProgress = false;
  errors = undefined;

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
    return Axios.post(globalStore.apiURL+'/auth/login', {
        userName: this.values.username,
        password: this.values.password
    })
    .then(( user ) => { 
        globalStore.setToken(user.data.authToken.token)
        userStore.pullUser()
    })
    .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
    }))
    .finally(action(() => { this.inProgress = false; }))
  }

  logout() {
    globalStore.setToken(undefined);
    userStore.forgetUser();
    return Promise.resolve();
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