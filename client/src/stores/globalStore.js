import { observable, action, reaction, decorate } from 'mobx';

class GlobalStore {

  appName = 'Administrative';
  apiURL = 'http://localhost:9000'
  module = ''
  token = window.localStorage.getItem('token');
  appLoaded = false;
  tags = [];
  isLoadingTags = false;
  slideTitle = ''
  formMethod = '';
  gridCells = {
    table: 11,
    form: 1,
    changed: false
  }

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

  // Set values for table and form grids
  swipeForm = (title, method) => {
    if (this.gridCells.changed) {
        this.gridCells = {
          table: 11,
          form: 1,
          changed: false
        }
    } else {
        this.gridCells = {
          table: 6,
          form: 6,
          changed: true
        }
    }
    this.setFormMethod(method)
    this.setSlideTitle(title)
  }

  setFormMethod(method) {
    this.formMethod = method
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

  setSlideTitle(title){
    this.slideTitle = title
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
  gridCells: observable,
  slideTitle: observable,
  formMethod: observable,
  setFormMethod: action,
  setSlideTitle: action,
  swipeForm: action,
  loadTags: action,
  setToken: action,
  setModule: action,
  setAppLoaded: action
})
export default new GlobalStore();
