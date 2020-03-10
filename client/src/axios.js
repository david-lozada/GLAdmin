import Axios from "axios";
import globalStore from './stores/globalStore';
import authStore from './stores/authStore';


const API_ROOT = 'https://localhost:9000';

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (globalStore.token) {
    req.set('authorization', `Token ${globalStore.token}`);
  }
};

export default {
};
