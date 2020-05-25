const API_BASE = 'http://localhost:3000';
const ALPHAV_KEY = 'OWWBK978K2C9WC2I';

const addUser = (data) => {
  return fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    })
  }).then(resp => resp.json());
}

const authUser = (data) => {
  return fetch(`${API_BASE}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  }).then(resp => resp.json());
}

const findCurrentUser = (token) => {
  return fetch(`${API_BASE}/current_user`, {
    method: 'GET',
    headers: {
      Authenticate: token
    }
  }).then(resp => resp.json());
}

const api = {
  addUser,
  authUser,
  findCurrentUser
}

export default api;
