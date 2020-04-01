import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class UserStore {

  records;
  currentUser;
  loading;
  submiting;
  deleting;
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
      value: this.record.firstName,
    }, {
      name: 'lastName',
      label: 'Apellido',
      placeholder: 'Ingrese Apellido',
      rules: 'required|string|between:2,20',
      value: this.record.lastName,
    }, {
      name: 'userName',
      label: 'Usuario',
      placeholder: 'Ingrese Usuario',
      rules: 'required|string|between:4,30',
      value: this.record.userName,
    }, {
      name: 'email',
      label: 'Correo',
      placeholder: 'Ingrese Correo',
      rules: 'required|email|string|between:5,25',
      value: this.record.email,
    }, {
      name: 'password',
      label: 'Contraseña',
      placeholder: 'Ingrese Contraseña',
      rules: 'required|string|between:5,25',
      value: this.record.password,
    }, {
      name: 'idRole',
      label: 'Ocupación',
      placeholder: 'Seleccione Rol',
      rules: 'required|number|max:1',
      value: this.record.idRole,
    }, {
      name: 'available',
      label: 'Disponible',
      placeholder: '',
      rules: 'boolean',
      value: this.record.available,
    }
  ];

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
        this.records.push(res.user) 
        return res
      }))
      .finally(action(() => { this.submiting = false; }))
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
  }
  /**
   *  Function used to get user by id
  */
  getUser(id) {
    this.loading = true;
    return axios.User.getUser(id)
    .then(( res ) => {
      this.record = res
    })
    .finally(action(() => { this.loading = false; }))
  }
  /**
   *  Function used to get all users in db
  */
  getAllUsers() {
    this.loading = true;
    return axios.User.getAllUsers()
    .then(( res ) => {
      this.records = res
    })
    .finally(action(() => { this.loading = false; }))
  }
  /**
   *  Function used to update user info
  */
  update(newUser) {
    this.submiting = true;
    /* return agent.Auth.save(newUser)
      .then(action(({ user }) => { this.currentUser = user; }))
      .finally(action(() => { this.submiting = false; })) */
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
  deletetUser(id) {
    this.deleting = true;
    return axios.User.deleteUser(id) 
    .then(( res ) => {
      return res
    })
    .finally(action(() => { this.deleting = false; }))
  }

}

decorate(UserStore, {
  records: observable,
  currentUser: observable,
  loading: observable,
  creating: observable,
  deleting: observable,
  updatingUserErrors: observable,
  record: observable,
  setRecord: action,
  setForm: action,
  reset: action,
  save: action,
  getAllUsers: action,
  getUser: action,
  pullUser: action,
  update: action,
  forgetUser: action
})

export default new UserStore();
