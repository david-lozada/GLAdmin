import Axios from 'axios';
import authStore from './stores/authStore';
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
        authStore.errors = err.response && err.response.body && err.response.body.errors;
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
        authStore.errors = err.response && err.response.body && err.response.body.errors;
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
      authStore.errors = err.response && err.response.body && err.response.body.errors;
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
      authStore.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
    })
};

const Auth = {
  current: () =>
    requests.get('/users/user'),
  login: (userName, password) =>
    requests.post('/auth/login', { userName, password }),
  register: (userName, email, password) =>
    requests.post('/users', {  userName, email, password }),
  save: user =>
    requests.put('/user', { user }),
  logout: () =>
    requests.delete('/auth/logout')
};

export default {
  Auth,
};
