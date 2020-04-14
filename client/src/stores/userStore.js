import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class UserStore {

  records = [];
  currentUser;
  loading;
  submiting;
  record = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
    idRole: '',
    available: '',
  };
  columns = [
      { title: "#", field: "id" },
      { title: "Nombre", field: "firstName" },
      { title: "Apellido", field: "lastName" },
      { title: "Correo", field: "email" },
      { title: "Ocupación", field: "idRole", lookup: { 1: "Master", 2: "Administrador", 3: "Empleado" }},
      { title: "Disponible", field: "available", type: "boolean" },
  ];
  fields = [
    {
      name: 'firstName',
      label: 'Nombre',
      placeholder: 'Ingrese Nombre',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'lastName',
      label: 'Apellido',
      placeholder: 'Ingrese Apellido',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'userName',
      label: 'Usuario',
      placeholder: 'Ingrese Usuario',
      rules: 'required|string|between:4,30',  
      type: 'text'
    }, {
      name: 'email',
      label: 'Correo',
      placeholder: 'Ingrese Correo',
      rules: 'required|email|string|between:5,25',  
      type: 'email'
    }, {
      name: 'password',
      label: 'Contraseña',
      placeholder: 'Ingrese Contraseña',
      rules: 'required|string|between:5,25',  
      type: 'password'
    }, {
      name: 'idRole',
      label: 'Ocupación',
      placeholder: 'Seleccione Rol',
      rules: 'required|number|max:1', 
      type: 'select'
    }, {
      name: 'available',
      label: 'Disponible',
      placeholder: '',
      rules: 'boolean', 
      type: 'checkbox'
    }
  ];

  getAllRecords() {
    /**
     *  Used to get all users in db
    */
    this.loading = true;
    axios.User.getAllUsers()
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
  /**
   *  Function used to set value of record on input change
  */
  setField(name, value) {
    this.record[name] = value
  }
  /**
   *  Function used to clear form inputs
  */
  reset() {
    this.record = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      idRole: '',
      available: false,
    };
  }
  /**
   *  Function used to save record through api
  */
  save(record) {
    this.submiting = true;
     return axios.User.save(record)
      .then(action((res) => { 
        this.submiting = false;
        return res
      }))
      .catch((err) => {
        this.submiting = false;
        console.log(err)
      })
  }
  /**
   *  Function used to get current user info
  */
  pullUser() {
    this.loading = true;
    return axios.User.current()
    .then(action(( res ) => { 
      this.currentUser = res.user.User;
      this.loading = false
    }))
      .catch((err) => {
        this.loading = false;
        console.log(err)
      })
  }
  /**
   *  Function used to get user by id
  */
  getRecord(id) {
    this.loading = true;
    return axios.User.getUser(id)
    .then(( res ) => {
      this.record = res
      this.loading = false;
    })
    .catch((err) => {
      this.loading = false;
      console.log(err)
    })
  }
  /**
   *  Function used to update user info
  */
  update(user) {
    this.submiting = true;
     return axios.User.update(user)
      .then(action((res) => { 
        this.submiting = false;
        return res
      }))
      .catch((err) => {
        this.submiting = false;
        console.log(err)
      })
  }
  /**
   *  Function used to clear current user data
  */
  forgetUser() {
    this.currentUser = undefined;
  }
  /**
   *  Function used to delete user
  */
  delete(id) {
    this.loading = true;
    return axios.User.delete(id) 
    .then(( res ) => {
    this.loading = false;
      return res
    })
    .catch((err) => {
      this.loading = false;
      console.log(err)

    })
  }
  /**
   *  Function used to add a record to list of records
  */
  addRecord(record) {
    const records = this.records
    delete record.password
    this.records = [ ...records, record ]
  }
  /**
   *  Function used to update record in list of records
  */
  updateRecord(record) {
    const records = this.records
    var updated = []
    records.map(row => {
      if (row.id === record.id) {
        row = record
        updated.push(row)
      } else {
        updated.push(row)
      }
      return null
    })
    this.records = updated
  }
  /**
   *  Function used to delete record in list of records
  */
  deleteRecord(record) {
    const records = [...this.records]
    const toDelete = records.find(row => row.id === record)
    const index = records.indexOf(toDelete)
    records.splice(index, 1)
    this.records = [...records]
  }

}

decorate(UserStore, {
  records: observable,
  currentUser: observable,
  loading: observable,
  submiting: observable,
  record: observable,
  addRecord: action,
  updateRecord: action,
  deleteRecord: action,
  reset: action,
  save: action,
  getUser: action,
  getAllRecords: action,
  delete: action,
  pullUser: action,
  update: action,
  forgetUser: action,
})

export default new UserStore();
