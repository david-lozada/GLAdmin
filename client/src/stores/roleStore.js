import { decorate, observable, action, autorun } from "mobx";

// Stores
import axios from "../axios";

class RoleStore {
  roles = []
  constructor() {
    autorun(reaction => {
      /**
       *  Used to get all users in db
      */
      axios.Role.getRole()
      .then(( res ) => {
        this.roles = res
      })
      reaction.dispose()
    })
  }
  forgetRole = () => {
    this.roles = []
  }
  
}
decorate(RoleStore, {
    roles: observable,
    forgetRole: action,
})
export default new RoleStore();