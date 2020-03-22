import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class UserStore {

  currentUser;
  loadingUser;
  updatingUser;
  updatingUserErrors;

  pullUser() {
    this.loadingUser = true;
    return axios.User.current()
    .then(action(( res ) => { this.currentUser = res.user.User;}))
    .finally(action(() => { this.loadingUser = false; }))
  }
  getAllUsers() {
    this.loadingUser = true;
    return axios.User.getAllUsers()
    .then(( res ) => {
      return res
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
  getAllUsers: action,
  pullUser: action,
  updateUser: action,
  forgetUser: action
})

export default new UserStore();
