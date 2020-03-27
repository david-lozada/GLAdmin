import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class UserStore {

  records;
  currentUser;
  loading;
  saveLoading;
  updatingUserErrors;
  record = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    idRole: '',
    available: false
  };

  reset() {
    this.record.firstName = ''
    this.record.lastName = ''
    this.record.userName = ''
    this.record.email = ''
    this.record.password = ''
    this.record.idRole = ''
    this.record.available = false
  }
  save(user) {
    this.saveLoading = true;
     return axios.User.save(user)
      /**
      *   TODO: Use response in push method
      */
      .then(action(({ user }) => { 
        this.records.push(this.record) 
        this.saveLoading = false;
      }))
  }
  pullUser() {
    this.loading = true;
    return axios.User.current()
    .then(action(( res ) => { 
      this.currentUser = res.user.User;
      this.loading = false
    }))
  }
  getAllUsers() {
    this.loading = true;
    return axios.User.getAllUsers()
    .then(( res ) => {
      this.records = res
    })
    .finally(action(() => { this.loading = false; }))
  }
  update(newUser) {
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
  records: observable,
  currentUser: observable,
  loading: observable,
  saveLoading: observable,
  updatingUserErrors: observable,
  user: observable,
  reset: action,
  save: action,
  getAllUsers: action,
  pullUser: action,
  update: action,
  forgetUser: action
})

export default new UserStore();
