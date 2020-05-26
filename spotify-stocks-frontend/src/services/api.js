const API_BASE = 'http://localhost:3000';
const ALPHAV_KEY = 'OWWBK978K2C9WC2I';

//******************************************************
// BACKEND
//******************************************************

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

//******************************************************
// ALPHAVANTAGE API
//******************************************************

// USED FOR INDIRECT SEARCH WITHOUT LIMITS
// *****************************
// const grabStock = (searchQuery) => {
//   return fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${searchQuery}`, {
//     method: 'GET'
//   }).then(resp => resp.json());
// }

const grabStock = (searchQuery) => {
  return fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHAV_KEY}`, {
    method: 'GET'
  }).then(resp => resp.json());
}

const fetchStockInfo = (symbol) => {
  return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${ALPHAV_KEY}`, {
    method: 'GET'
  }).then(resp => resp.json());
}


const api = {
  addUser,
  authUser,
  findCurrentUser,
  grabStock,
  fetchStockInfo
}

export default api;
