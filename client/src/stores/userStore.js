import { observable, action, decorate, autorun } from 'mobx';
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
      { title: "Contraseña", field: "password" },
      { title: "Rol", field: "idRole", lookup: { 1: "Master", 2: "Administrador", 3: "Empleado" }},
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

  constructor() {
    autorun(reaction => {
      /**
       *  Used to get all users in db
      */
      this.loading = true;
      axios.User.getAllUsers()
      .then(( res ) => {
        this.records = res
        this.loading = false;
      })
      reaction.dispose()
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
  save(user) {
    this.submiting = true;
     return axios.User.save(user)
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
    return axios.User.deleteUser(id) 
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
  addRecords(record) {
    const records = this.records
    this.records = [ ...records, record ]
  }
  /**
   *  Function used to update record in list of records
  */
  updateRecords(record) {
    const records = [...this.records]
    records.find(row => {
      if (row.id === record.id) {
        row = { ...row, record }
        console.log(row)
      }
    })
    this.records = [...records]
  }
  /**
   *  Function used to delete record in list of records
  */
  deleteRecords(record) {
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
  updateRecords: action,
  setRecord: action,
  setForm: action,
  reset: action,
  save: action,
  getAllUsers: action,
  getUser: action,
  delete: action,
  pullUser: action,
  update: action,
  forgetUser: action,
})

export default new UserStore();
