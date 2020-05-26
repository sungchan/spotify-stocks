const API_BASE = 'http://localhost:3000';
const ALPHAV_KEY = 'OWWBK978K2C9WC2I';

//******************************************************
// USER
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
  }).then(resp => resp.json())
}

const findCurrentUser = (token) => {
  return fetch(`${API_BASE}/current_user`, {
    method: 'GET',
    headers: {
      Authenticate: token
    }
  }).then(resp => resp.json())
}

const portfolioFetch = (id) => {
  return fetch(`${API_BASE}/users/${id}`, {
    method: 'GET'
  }).then(resp => resp.json())
}

//******************************************************
// STOCK TRANSACTIONS
//******************************************************

const buyStocks = (data) => {
  return fetch(`${API_BASE}/owned_stocks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      symbol: data.symbol,
      quantity: data.purchaseQuantity,
      stockName: data.stockName,
      latestPrice: data.latestPrice,
      userId: data.userId,
      totalPrice: data.totalPrice
    })
  }).then(resp => resp.json())
}


//******************************************************
// ALPHAVANTAGE API
//******************************************************

// LIMITED SEARCH FUNCTIONALITY
// *****************************
// const grabStock = (searchQuery) => {
//   return fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHAV_KEY}`, {
//     method: 'GET'
//   }).then(resp => resp.json());
// }

// USED FOR INDIRECT SEARCH WITH UNLIMITED SEARCH
// *****************************
const grabStock = (searchQuery) => {
  return fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${searchQuery}`, {
    method: 'GET'
  }).then(resp => resp.json());
}


const fetchStockInfo = (symbol) => {
  return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAV_KEY}`, {
    method: 'GET'
  }).then(resp => resp.json());
}


const api = {
  addUser,
  authUser,
  findCurrentUser,
  buyStocks,
  grabStock,
  fetchStockInfo,
  portfolioFetch
}

export default api;
