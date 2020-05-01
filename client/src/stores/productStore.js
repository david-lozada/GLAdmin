import { observable, action, decorate, autorun, reaction } from 'mobx';
import axios from '../axios';
import numeral from 'numeral'

class ProductStore {

  records = [];
  currentUser;
  loading;
  submiting;
  record = {
    code: '',
    name: '',
    price: '',
    dollarPrice: '',
    idTax: '',
    observation: '',
    image: '',
    available: false,
  };
  columns = [
      { title: "#", field: "id" },
      { title: "Código", field: "code" },
      { title: "Nombre", field: "name" },
      { title: "Precio", field: "price" },
      { title: "Impuesto", field: "idTax", lookup: {} },
      { title: "Disponible", field: "available", type: "boolean" },
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
      rules: 'required|string|between:2,20',  
      type: 'text'
    }, {
      name: 'idTax',
      label: 'Impuesto',
      placeholder: 'Ingrese Impuesto',
      rules: 'required|string|between:2,4',  
      type: 'select',
      options: {}
    }, {
      name: 'dollarPrice',
      label: 'Precio en Dólar',
      placeholder: 'Ingrese Precio en Dólar',
      rules: 'notRequired|string|between:2,4',  
      type: 'currency'
    }, {
      name: 'price',
      label: 'Precio',
      placeholder: 'Ingrese Precio',
      rules: 'required|email|string|between:5,25',  
      type: 'currency'
    }, {
      name: 'observation',
      label: 'Observación',
      placeholder: 'Ingrese Observación',
      rules: 'notRequired|string|between:4,30',  
      type: 'text'
    }, {
      name: 'available',
      label: 'Disponible',
      placeholder: '',
      rules: 'boolean', 
      type: 'checkbox'
    }, {
      name: 'image',
      label: 'Imágen',
      placeholder: '',
      rules: 'notRequired|string|between:2,4',  
      type: 'file'
    }, 
  ];
  foreignExchange = 0;

  constructor() {
    autorun(() => {
      return axios.ForeignExchange.getForeignExchange()
        .then(( res ) => {
          this.foreignExchange = res[0].value
        })
        .catch((err) => {
          console.log(err)
        })
    })
    reaction(
      () => this.record.dollarPrice,
      dollarPrice => {
        if (dollarPrice) {
          const dollar = parseInt(dollarPrice)
          const foreignExchange = parseInt(this.foreignExchange)
          this.record.price = dollar * foreignExchange
        }
      }
    );
  }

  /**
   *  Method to set file to record object
   */
  setFiles(files) {
    this.record.image = files
  }

  /**
   * Method to add options(lookup) to a field in datatable
   */
  setColumnLookup(options, index) {
    const parsed = {}
    for(let option of options ){
      Object.assign(parsed, {[option.id]: option.name})
    }
    this.columns[index].lookup = parsed
  }

  /**
   * Method to add options(lookup) to a field in datatable
   */
  setFieldOptions(options, index) {
    const parsed = []
    for(let option of options ){
      parsed.push({ 'id': option.id, 'name': option.name })
    }
    this.fields[index].options = parsed
  }

  /**
   *  Methos to format number to currency
   */
  setCurrencyFormat(rows) {
    for(let row of rows){
      row.price = numeral(row.price).format('0,0') + ' Bs'
    }
    return rows
  }

  getAllRecords() {
    /**
     *  Used to get all users in db
    */
    this.loading = true;
    return axios.Product.getAllRecords()
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
      code: '',
      name: '',
      price: 0,
      dollarPrice: 0,
      idTax: '',
      observation: '',
      available: false,
    };
  }
  /**
   *  Function used to save record through api
  */
  save(record) {
    this.submiting = true;
     return axios.Product.save(record)
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
    return axios.Product.getRecord(id)
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
     return axios.Product.update(record)
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
    return axios.Product.delete(id) 
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

decorate(ProductStore, {
  records: observable,
  loading: observable,
  submiting: observable,
  record: observable,
  fields: observable,
  columns: observable,
  foreignExchange: observable,
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

export default new ProductStore();
