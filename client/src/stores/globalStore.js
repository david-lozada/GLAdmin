import { observable, action, reaction, decorate } from 'mobx';


class GlobalStore {

  appName = 'Administrative';
  apiURL = 'http://localhost:9000'
  module = ''
  token = window.localStorage.getItem('token');
  appLoaded = false;
  slideTitle = ''
  formMethod = '';
  gridCells = {
    table: 12,
    form: false,
    isOpen: false,
  }
  tableLoading = false;
  foreignExchange = null;
  searchDrawer = false;

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

  setSearchDrawer(open) {
    this.searchDrawer = open
  }

  // Set values for table and form grids
  swipeOutForm = (title, method) => {
    this.gridCells = {
      table: 6,
      form: 6,
      isOpen: true
    }
    this.setFormMethod(method)
    this.setSlideTitle(title)
  }

  swipeInForm = () => {
    this.gridCells = {
      table: 12,
      form: false,
      isOpen: false,
    }
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
  tableLoading: observable,
  gridCells: observable,
  slideTitle: observable,
  formMethod: observable,
  searchDrawer: observable,
  setFormMethod: action,
  setSlideTitle: action,
  swipeOutForm: action,
  swipeInForm: action,
  setIsUpdateSlide: action,
  setToken: action,
  setModule: action,
  setAppLoaded: action,
  setSearchDrawer: action
})
export default new GlobalStore();
