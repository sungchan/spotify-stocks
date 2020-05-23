const API_BASE = 'http://localhost:3000';

const addUser = (data) => {
  console.log(data)
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

const api = {
  addUser
}

export default api;
