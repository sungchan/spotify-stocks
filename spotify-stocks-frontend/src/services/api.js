const API_BASE = 'http://localhost:3000';

const addUser = (firstName, lastName, email, password) => {
  return fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
  }).then(resp => resp.json())
}

const api = {
  addUser
}

export default api;
