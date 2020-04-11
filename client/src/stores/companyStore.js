import { observable, action, decorate, autorun } from 'mobx';
import axios from '../axios';

class CompanyStore {

  records = [];
  currentUser;
  loading;
  submiting;
  record = {
    documentNumber: '',
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    website: '',
  };
  columns = [
      { title: "#", field: "id" },
      { title: "RIF", field: "documentNumber" },
      { title: "Nombre", field: "name" },
      { title: "Dirección", field: "address" },
      { title: "Teléfono", field: "phoneNumber" },
      { title: "Correo", field: "email" },
      { title: "Sitio Web", field: "website" },
  ];
  fields = [
    {
      name: 'documentNumber',
      label: 'RIF',
      placeholder: 'Ingrese RIF',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'name',
      label: 'Empresa',
      placeholder: 'Ingrese Apellido',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'email',
      label: 'Correo',
      placeholder: 'Ingrese Correo',
      rules: 'required|string|between:5,25',  
      type: 'email'
    }, {
      name: 'address',
      label: 'Dirección',
      placeholder: 'Ingrese Dirección',
      rules: 'required|string|between:4,30',  
      type: 'text'
    }, {
      name: 'phoneNumber',
      label: 'Télefono',
      placeholder: 'Ingrese Télefono',
      rules: 'required|email|string|between:5,25',  
      type: 'text'
    }, {
      name: 'website',
      label: 'Sitio Web',
      placeholder: 'Ingrese Sitio Web',
      rules: 'notRequired|string|between:5,25',  
      type: 'text'
    }, 
  ];

  constructor() {
    autorun(reaction => {
      /**
       *  Used to get all users in db
      */
      this.loading = true;
      axios.Company.getAllRecords()
      .then(( res ) => {
        this.records = res
        this.loading = false;
      })
      .catch((err) => {
        console.log(err)
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
      documentNumber: '',
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
      website: '',
    };
  }
  /**
   *  Function used to save record through api
  */
  save(record) {
    this.submiting = true;
     return axios.Company.save(record)
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
    return axios.Company.getRecord(id)
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
     return axios.Company.update(record)
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
    return axios.Company.delete(id) 
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

decorate(CompanyStore, {
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
  delete: action,
  update: action,
})

export default new CompanyStore();
