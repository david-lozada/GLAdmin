import Axios from 'axios';
import globalStore from './stores/globalStore';


const API_ROOT = 'http://localhost:9000';

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
    requests.get('/users/user'),
  getAllUsers: () =>
    requests.get('/users/all'),
  register: (data) =>
    requests.post('/users', { data }),
  save: user =>
    requests.put('/user', { user })
};

export default {
  Auth,
  User,
};
