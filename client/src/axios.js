import Axios from 'axios';
import globalStore from './stores/globalStore';


const API_ROOT = globalStore.apiURL;

const requests = {
  delete: url =>
    Axios.delete(API_ROOT + url, {
      headers: { Authorization: `Bearer ${globalStore.token}` }
    })
    .then(( res ) =>  {
      return res.data
    })
    .catch((err) => {
        err = err.response && err.response.body && err.response.body.errors;
        throw err;
    }),
  get: url =>
    Axios.get(API_ROOT + url, {
      headers: { Authorization: `Bearer ${globalStore.token}` }
    })
    .then(( res ) =>  {
      return res.data
    })
    .catch((err) => {
        err = err.response && err.response.body && err.response.body.errors;
        throw err;
    }),
  put: (url, body) =>
    Axios.put(API_ROOT + url, body, {
      headers: { Authorization: `Bearer ${globalStore.token}` }
    })
    .then(( res ) =>  {
      return res.data
    })
    .catch((err) => {
      err = err.response && err.response.body && err.response.body.errors;
        throw err;
    }),
  post: (url, body) =>
    Axios.post(API_ROOT + url, body,{
      headers: { Authorization: `Bearer ${globalStore.token}` }
    })
    .then(( res ) =>  {
      return res.data
    })
    .catch((err) => {
      err = err.response && err.response.body && err.response.body.errors;
        throw err;
    })
};

const Auth = {
  login: (userName, password) =>
    requests.post('/auth/login', { userName, password }),
  logout: () =>
    requests.delete('/auth/logout')
};

const User = {
  current: () =>
    requests.get('/users/current'),
  getAllUsers: () =>
    requests.get('/users/all'),
  getUser: (id) =>
    requests.get('/users/user/'+id),
  delete: (id) =>
    requests.delete('/users/delete/'+id),
  save: (data) =>
    requests.post('/users/create', data ),
  update: (user) =>
    requests.put('/users/update',  user )
};

const Customer = {
  getAllRecords: () =>
    requests.get('/customers/all'),
  getRecord: (id) =>
    requests.get('/customers/customer/'+id),
  delete: (id) =>
    requests.delete('/customers/delete/'+id),
  save: (data) =>
    requests.post('/customers/create', data ),
  update: (customer) =>
    requests.put('/customers/update',  customer )
};

const Supplier = {
  getAllRecords: () =>
    requests.get('/suppliers/all'),
  getRecord: (id) =>
    requests.get('/suppliers/supplier/'+id),
  delete: (id) =>
    requests.delete('/suppliers/delete/'+id),
  save: (data) =>
    requests.post('/suppliers/create', data ),
  update: (supplier) =>
    requests.put('/suppliers/update',  supplier )
};

const Company = {
  getAllRecords: () =>
    requests.get('/companies/all'),
  getRecord: (id) =>
    requests.get('/companies/company/'+id),
  delete: (id) =>
    requests.delete('/companies/delete/'+id),
  save: (data) =>
    requests.post('/companies/create', data ),
  update: (company) =>
    requests.put('/companies/update',  company )
};

const Tax = {
  getAllRecords: () =>
    requests.get('/taxes/all'),
  getRecord: (id) =>
    requests.get('/taxes/tax/'+id),
  delete: (id) =>
    requests.delete('/taxes/delete/'+id),
  save: (data) =>
    requests.post('/taxes/create', data ),
  update: (tax) =>
    requests.put('/taxes/update',  tax )
};

const Batch = {
  getAllRecords: () =>
    requests.get('/batches/all'),
  getRecord: (id) =>
    requests.get('/batches/batch/'+id),
  delete: (id) =>
    requests.delete('/batches/delete/'+id),
  save: (data) =>
    requests.post('/batches/create', data ),
  update: (batch) =>
    requests.put('/batches/update',  batch )
};

const Stock = {
  getAllRecords: () =>
    requests.get('/stocks/all'),
  getRecord: (id) =>
    requests.get('/stocks/stock/'+id),
  delete: (id) =>
    requests.delete('/stocks/delete/'+id),
  save: (data) =>
    requests.post('/stocks/create', data ),
  update: (product) =>
    requests.put('/stocks/update',  product )
};

const Product = {
  getAllRecords: () =>
    requests.get('/products/all'),
  getRecord: (id) =>
    requests.get('/products/product/'+id),
  delete: (id) =>
    requests.delete('/products/delete/'+id),
  save: (data) =>
    requests.post('/products/create', data ),
  update: (product) =>
    requests.put('/products/update',  product )
};

const Role = {
  getRole: () =>
    requests.get('/roles/current'),
  getAllRecords: () =>
    requests.get('/roles/all'),
};


const ForeignExchange = {
  getForeignExchange: () =>
    requests.get('/foreign-exchanges/current')
};

export default {
  Auth,
  User,
  Customer,
  Supplier,
  Company,
  Tax,
  Batch,
  Stock,
  Product,
  ForeignExchange,
  Role,
};
