import { observable, action, decorate, computed } from 'mobx';
import axios from '../axios';

class UserStore {

  currentUser;
  loadingUser;
  updatingUser;
  updatingUserErrors;

  get getCurrentUser() {
    return this.currentUser.firstName + ' ' + this.currentUser.lastName
  }
  pullUser() {
    this.loadingUser = true;
    return axios.Auth.current()
    .then(action(( res ) => { this.currentUser = res.user.User;}))
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
  getCurrentUser: computed,
  pullUser: action,
  updateUser: action,
  forgetUser: action
})

export default new UserStore();
