import { observable, action, decorate } from 'mobx';
import Axios from 'axios';
import globalStore from './globalStore';

class UserStore {

  currentUser;
  loadingUser;
  updatingUser;
  updatingUserErrors;

  pullUser() {
    // console.log(globalStore.headers)
    this.loadingUser = true;
    Axios.get(globalStore.apiURL + '/users/user', {
      headers: globalStore.headers
    })
    .then(action(({ user }) => { 
      this.currentUser = user; 
    }))
    .catch(function (error) {
      console.log(error);
    })
    .finally(action(() => { this.loadingUser = false; }))
  }

  updateUser(newUser) {
    this.updatingUser = true;
    /* return agent.Auth.save(newUser)
      .then(action(({ user }) => { this.currentUser = user; }))
      .finally(action(() => { this.updatingUser = false; })) */
  }

  forgetUser() {
    this.currentUser = undefined;
  }

}

decorate(UserStore, {
  currentUser: observable,
  loadingUser: observable,
  updatingUser: observable,
  updatingUserErrors: observable,
  pullUser: action,
  updateUser: action,
  forgetUser: action
})

export default new UserStore();
