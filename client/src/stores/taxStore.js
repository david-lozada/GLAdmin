import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class TaxStore {

  records = [];
  currentUser;
  loading;
  submiting;
  record = {
    name: '',
    percentage: ''
  };
  columns = [
      { title: "#", field: "id" },
      { title: "Nombre", field: "name" },
      { title: "Porcentaje", field: "percentage" },
  ];
  fields = [
    {
      name: 'name',
      label: 'Nombre',
      placeholder: 'Ingrese Nombre',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'percentage',
      label: 'Porcentaje',
      placeholder: 'Ingrese Porcentaje',
      rules: 'required|string|between:2,4',  
      type: 'number'
    }, 
  ];

  /**
   *  Used to get all users in db
  */
  getAllRecords() {
    this.loading = true;
    axios.Tax.getAllRecords()
    .then(( res ) => {
      this.records = res
      this.loading = false;
    })
    .catch((err) => {
      console.log(err)
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
      name: '',
      percentage: ''
    };
  }
  /**
   *  Function used to save record through api
  */
  save(record) {
    this.submiting = true;
     return axios.Tax.save(record)
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
    return axios.Tax.getRecord(id)
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
     return axios.Tax.update(record)
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
    return axios.Tax.delete(id) 
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

decorate(TaxStore, {
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

export default new TaxStore();
