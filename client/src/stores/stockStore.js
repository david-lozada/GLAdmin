import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class StockStore {

  records = [];
  currentUser;
  loading;
  submiting;
  record = {
    code: '',
    name: '',
    price: '',
    existence: '',
    entryDate: '',
    idSupplier: '',
    idTax: ''
  };
  columns = [
      { title: "#", field: "id" },
      { title: "Código", field: "code" },
      { title: "Nombre", field: "name" },
      { title: "Precio", field: "price" },
      { title: "Existencia", field: "existence" },
      { title: "Fecha de Ingreso", field: "entryDate" },
      { title: "Proveedor", field: "idSupplier" },
      { title: "Impuesto", field: "idTax" },
  ];
  fields = [
    {
      name: 'code',
      label: 'Código',
      placeholder: 'Ingrese Código',
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'name',
      label: 'Nombre',
      placeholder: 'Ingrese Nombre',
      rules: 'required|string|between:2,4',  
      type: 'number'
    }, {
      name: 'price',
      label: 'Precio',
      placeholder: 'Ingrese Precio',
      rules: 'required|string|between:2,4',  
      type: 'number'
    }, {
      name: 'existence',
      label: 'Existencia',
      placeholder: 'Ingrese Existencia',
      rules: 'required|string|between:2,4',  
      type: 'number'
    }, {
      name: 'entryDate',
      label: 'Fecha de Ingreso',
      placeholder: 'Ingrese Fecha de Ingreso',
      rules: 'required|string|between:2,4',  
      type: 'date'
    }, {
      name: 'idSupplier',
      label: 'Proveedor',
      placeholder: 'Ingrese Proveedor',
      rules: 'required|string|between:2,4',  
      type: 'text'
    }, {
      name: 'idTax',
      label: 'Impuesto',
      placeholder: 'Ingrese Impuesto',
      rules: 'required|string|between:2,4',  
      type: 'text'
    }, {
      name: 'available',
      label: 'Disponible',
      placeholder: '',
      rules: 'notRequired|string|between:2,4',  
      type: 'checkbox'
    }, 
  ];

  /**
   *  Used to get all users in db
  */
  getAllRecords() {
    this.loading = true;
    axios.Stock.getAllRecords()
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
     return axios.Stock.save(record)
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
    return axios.Stock.getRecord(id)
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
     return axios.Stock.update(record)
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
    return axios.Stock.delete(id) 
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

decorate(StockStore, {
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

export default new StockStore();
