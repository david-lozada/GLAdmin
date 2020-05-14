import { observable, action, decorate, computed } from 'mobx';
import axios from '../axios';
import numeral from 'numeral'

class StockStore {

  records = [];
  currentUser; 
  loading;
  submiting;
  suppliers;
  taxes;
  record = {
    type: 1,
    idSupplier: null,
    idProduct: null,
    existence: '',
    idBatch: null,
    expiryDate: '',
    observation: '',
  };
  dialogOpen = false;
  columns = [
      { title: "Código", field: "code" },
      { title: "Producto", field: "idProduct"},
      { title: "Proveedor", field: "idSupplier"},
      { title: "Lote", field: "idBatch", lookup: {} },
      { title: "Existencia", field: "existence" },
  ];
  fields = [
    {
      name: 'type',
      label: 'Tipo',
      placeholder: 'Ingrese Tipo',
      rules: 'required|string|between:2,20',  
      type: 'select'
    }, {
      name: 'idSupplier',
      label: 'Proveedor',
      placeholder: 'Ingrese Proveedor',
      rules: 'required|string|between:2,4',  
      type: 'text'
    }, {
      name: 'idProduct',
      label: 'Producto',
      placeholder: 'Ingrese Producto',
      rules: 'required|string|between:2,4',  
      type: 'text'
    }, {
      name: 'existence',
      label: 'Unidades',
      placeholder: 'Ingrese Unidades',
      rules: 'required|string|between:2,4',  
      type: 'number'
    }, {
      name: 'selectBatch',
      label: 'Seleccione Lote',
      placeholder: 'Ingrese Lote',
      rules: 'notRequired|string|between:2,4',  
      type: 'select',
      options: {}
    }, {
      name: 'idBatch',
      label: 'Lote',
      placeholder: 'Ingrese Lote',
      rules: 'notRequired|string|between:2,4',  
      type: 'text'
    }, {
      name: 'expiryDate',
      label: 'Fecha de Caducidad',
      placeholder: 'Ingrese Fecha de Caducidad',
      rules: 'notRequired|string|between:2,4',  
      type: 'date'
    }, {
      name: 'available',
      label: 'Disponible',
      placeholder: '',
      rules: 'notRequired|string|between:2,4',  
      type: 'checkbox'
    }, {
      name: 'observation',
      label: 'Observación',
      placeholder: '',
      rules: 'notRequired|string|between:2,4',  
      type: 'text'
    },  
  ];

  /**
   *  Method to populate autocomplete
   *  params {model} and {id} id of record
   */
  setAutocompleteValue(model, id) {
    let result = model.find(row => row.id === id )
    let index = model.indexOf(result)
    return model[index]
  }

  /**
   *  Open and close dialog to show full stock info
   */
  setDialogOpen(value) {
    this.dialogOpen = value
  };

  /**
   * Function that adds columns options
   * Params @options records from db @index column position @field name of the field to display
   */
  setColumnLookup(options, index, field) {
    const parsed = {}
    for(let option of options ){
      Object.assign(parsed, 
        {[option.id]: 
          {
            'name': option.name,
            'code': option.code,
            'fullname': `${option.firstName} ${option.lastName}`
          }[field]
        }
      )
    }
    this.columns[index].lookup = parsed
  }

  /**
   * Method to add options(lookup) to a field in datatable
   */
  setFieldOptions(options, index) {
    const parsed = []
    for(let option of options ){
      parsed.push({ 'id': option.id, 'code': option.code })
    }
    this.fields[index].options = parsed
  }
  /**
   * Function to format number to currency
   */
  setCurrencyFormat(row) {
    let amount = numeral(row).format('0,0') + ' Bs'
    return amount
  }

  get fullRecords() {
    const records = []
    for(let row of this.records) {
      let obj = { 
        id: row.id,
        code: (row.product.code !== undefined) ? row.product.code : row.productData.productCode, 
        idProduct: (row.product.name !== undefined) ? row.product.name : row.productData.productName, 
        idSupplier: (row.supplier) ? `${row.supplier.firstName} ${row.supplier.lastName}` : null, 
        idBatch: row.idBatch,
        existence: row.existence,
        expiryDate: row.expiryDate
      }
      records.push(obj)
    }
    return records
  }

  /**
   *  Used to get all users in db
  */
  getAllRecords() {
    this.loading = true;
    return axios.Stock.getAllRecords()
      .then(( res ) => {
        this.records = res
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => this.loading = false)
  }
  /**
   *  Function used to set value of record on input change
  */
  setField(name, value) {
    this.record[name] = value
    console.log(this.record[name])
  }
  /**
   *  Function used to clear form inputs
  */
  reset() {
    this.record = {
      type: 1,
      idSupplier: null,
      idProduct: null,
      existence: '',
      idBatch: null,
      expiryDate: '',
      observation: '',
    };
  }
  /**
   *  Function used to save record through api
  */
  save(record) {
    this.submiting = true;
     return axios.Stock.save(record)
      .then(action((res) => { 
        this.getAllRecords()
        return res
      }))
      .catch(action((err) => {
        console.log(err)
      }))
      .finally(() => {
        this.submiting = false;
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
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => this.loading = false)
  }
  /**
   *  Function used to update user info
  */
  update(record) {
    this.submiting = true;
     return axios.Stock.update(record)
      .then(action((res) => { 
        return res
      }))
      .catch((err) => {
        console.log(err)
      })
      .finally(() => this.submiting = false)
  }
  /**
   *  Function used to delete user
  */
  delete(id) {
    this.loading = true;
    return axios.Stock.delete(id) 
    .then(( res ) => {
      return res
    })
    .catch((err) => {
      throw err
    })
    .finally(() => this.loading = false)
  }
  /**
   *  Function used to add a record to list of records
  */
  addRecord(record) {
    const records = this.records
    delete record.password
    this.records = [ ...records, record ]
    this.setCurrencyFormat(this.records)
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
  suppliers: observable,
  taxes: observable,
  validation: observable,
  columns: observable,
  fields: observable,
  dialogOpen: observable,
  productCombobox: observable,
  supplierCombobox: observable,
  addRecord: action,
  updateRecord: action,
  deleteRecord: action,
  reset: action,
  save: action,
  getRecord: action,
  getAllRecords: action,
  delete: action,
  update: action,
  validate: action,
  setFiles: action,
  setColumnLookup: action,
  setCurrencyFormat: action,
  setAutocompleteValue: action,
  setDialogOpen: action,
  fullRecords: computed,
})

export default new StockStore();
