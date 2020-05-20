import { observable, action, decorate } from 'mobx';
import axios from '../axios';

class SttForeignExchangeStore {

  submiting;
  record = {
    foreignExchange: '',
  };

  /**
   *  Function used to get user by id
  */
  getLastest() {
    this.submiting = true;
    return axios.ForeignExchange.getForeignExchange()
    .then(( res ) => this.record = res)
    .catch((err) => console.log(err))
    .finally(() => this.submiting = false)
  }
  /**
   *  Function used to set value of record on input change
  */
  setField(name, value) {
    this.record[name] = value
  }
  /**
   *  Function used to save record through api
  */
  save(record) {
    this.submiting = true;
     return axios.ForeignExchange.save(record)
      .then(action((res) => { 
        return res
      }))
      .catch((err) => console.log(err))
      .finally(() => this.submiting = false)
  }

}

decorate(SttForeignExchangeStore, {
  submiting: observable,
  record: observable,
  fields: observable,
  setField: action,
  save: action
})

export default new SttForeignExchangeStore();
