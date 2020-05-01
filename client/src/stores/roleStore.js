import { decorate, observable, action, computed } from "mobx";
import { uniqBy } from 'lodash';
import rolesConfig from '../config/rolesConfig';

// Stores
import axios from "../axios";

class RoleStore {
  roles = []
  records= []

  get allowedRoutes() {
    let allowedRoutes = this.roles.reduce((acc, role) => {
      return [
        ...acc,
        ...rolesConfig[role].routes
      ]
    }, []);
    // For removing duplicate entries.
    allowedRoutes = uniqBy(allowedRoutes, 'component');
    return allowedRoutes
  }

  /**
   *  Used to get all users in db
  */
  getAllRecords() {
    this.loading = true;
    return axios.Role.getAllRecords()
      .then(( res ) => {
        this.records = res
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.loading = false;
      })
  }

  getRole = () => {
    axios.Role.getRole()
    .then(( res ) => {
      this.roles = res
    })
  }
  forgetRole = () => {
    this.roles = []
  }
  
}
decorate(RoleStore, {
    roles: observable,
    records: observable,
    forgetRole: action,
    allowedRoutes: computed,
})
export default new RoleStore();