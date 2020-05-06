import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class SupplierStore {

  records = [];
  currentUser;
  loading;
  submiting;
  record = {
    documentNumber: '',
    companyName: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    available: false,
  };
  columns = [
      { title: "#", field: "id" },
      { title: "RIF", field: "documentNumber" },
      { title: "Empresa", field: "companyName" },
      { title: "Nombres", field: "firstName" },
      { title: "Apellidos", field: "lastName" },
      { title: "Correo", field: "email" },
      { title: "Teléfono", field: "phoneNumber" },
      { title: "Dirección", field: "address" },
      { title: "Disponible", field: "available", type: "boolean" },
  ];
  fields = [
    {
      name: 'documentNumber',
      label: 'RIF',
      placeholder: 'Ingrese Cédula',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'companyName',
      label: 'Empresa',
      placeholder: 'Ingrese Apellido',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'firstName',
      label: 'Nombres del Representante',
      placeholder: 'Ingrese Apellido',
      rules: 'notRequired|string|between:2,20',  
      type: 'text'
    }, {
      name: 'lastName',
      label: 'Apellidos del Representante',
      placeholder: 'Ingrese Apellido',
      rules: 'notRequired|string|between:2,20',  
      type: 'text'
    }, {
      name: 'address',
      label: 'Dirección',
      placeholder: 'Ingrese Dirección',
      rules: 'required|string|between:4,30',  
      type: 'text'
    }, {
      name: 'phoneNumber',
      label: 'Télefono',
      placeholder: 'Ingrese Correo',
      rules: 'required|email|string|between:5,25',  
      type: 'text'
    }, {
      name: 'email',
      label: 'Correo',
      placeholder: 'Ingrese Correo',
      rules: 'required|string|between:5,25',  
      type: 'email'
    }, {
      name: 'available',
      label: 'Disponible',
      placeholder: '',
      rules: 'boolean', 
      type: 'checkbox'
    }
  ];

  /**
   *  Used to get all users in db
  */
  getAllRecords() {
    this.loading = true;
    return axios.Supplier.getAllRecords()
      .then(( res ) => {
        this.records = res
      })
      .catch((err) => console.log(err))
      .finally(() => this.loading = false)
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
      documentNumber: '',
      companyName: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      available: false,
    };
  }
  /**
   *  Function used to save record through api
  */
  save(record) {
    this.submiting = true;
     return axios.Supplier.save(record)
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
   *  Function used to get user by id
  */
  getRecord(id) {
    this.loading = true;
    return axios.Supplier.getRecord(id)
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
  update(record) {
    this.submiting = true;
     return axios.Supplier.update(record)
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
   *  Function used to delete user
  */
  delete(id) {
    this.loading = true;
    return axios.Supplier.delete(id) 
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

decorate(SupplierStore, {
  records: observable,
  loading: observable,
  submiting: observable,
  record: observable,
  addRecord: action,
  updateRecord: action,
  deleteRecord: action,
  reset: action,
  save: action,
  getRecord: action,
  getAllRecords: action,
  delete: action,
  update: action,
})

export default new SupplierStore();
