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
export default {
  Auth,
  User,
  Customer,
  Supplier,
};
