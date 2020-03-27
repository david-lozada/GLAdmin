import { observable, action, reaction, decorate } from 'mobx';

class GlobalStore {

  appName = 'Administrative';
  apiURL = 'http://localhost:9000'
  module = ''
  token = window.localStorage.getItem('token');
  appLoaded = false;

  tags = [];
  isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('token', token);
        } else {
          window.localStorage.clear()
        }
      }
    );
  }

  setToken(token) {
    this.token = token;
  }

  setAppLoaded() {
    this.appLoaded = true;
  }

  setModule(name) {
    this.module = name;
  }
}
decorate(GlobalStore, {
  appName: observable,
  apiURL: observable,
  token: observable,
  module: observable,
  appLoaded: observable,
  tags: observable,
  isLoadingTags: observable,
  loadTags: action,
  setToken: action,
  setModule: action,
  setAppLoaded: action
})
export default new GlobalStore();
