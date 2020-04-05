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
    isOpen: false,
  }
  tableLoading = false;

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
    /*if (this.gridCells.isOpen) {
      if (this.gridCells.isUpdate) {*/
        this.gridCells = {
          table: 6,
          form: 6,
          isOpen: true
        }
      /*} else {
        this.gridCells = {
          table: 11,
          form: 1,
        }
      }
    }*/
    this.setFormMethod(method)
    this.setSlideTitle(title)
  }

  setIsUpdateSlide(bool) {
    this.gridCells.isUpdate = bool
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

  setTableLoaded() {
    this.tableLoading = !this.tableLoading;
  }
}
decorate(GlobalStore, {
  appName: observable,
  apiURL: observable,
  token: observable,
  module: observable,
  appLoaded: observable,
  tags: observable,
  tableLoading: observable,
  isLoadingTags: observable,
  gridCells: observable,
  slideTitle: observable,
  formMethod: observable,
  setFormMethod: action,
  setSlideTitle: action,
  swipeForm: action,
  setIsUpdateSlide: action,
  loadTags: action,
  setToken: action,
  setModule: action,
  setAppLoaded: action
})
export default new GlobalStore();
