import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react'

import api from './services/api';

import RegistrationPage from './containers/RegistrationPage';
import LoginPage from './containers/LoginPage';
import Navbar from './containers/Navbar';
import Portfolio from './containers/Portfolio';

class App extends React.Component {
  state = {
    // *** REGISTRATION STATES ***
    firstName: '',
    lastName: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword: '',
    registrationError: false,
    // *** LOGIN STATES ***
    userId: null,
    email: '',
    password: '',
    loginError: false,
    balance: null,
    transactions: [],
    ownedStocks: [],
    // *** STOCK SEARCH ***
    symbol: 'TSLA',
    isLoading: false,
    results: [],
    stockName: 'Tesla',
    openingPrice: '822.1735',
    latestPrice: "822.1735",
    // *** BUYING STOCKS
    purchaseQuantity: null,
    enoughFunds: false,
    totalPrice: null,
    totalQuantity: null
  }





  //******************************************************
  // REGISTRATION
  //******************************************************

  handleFirstNameChange = (e) => {
    e.preventDefault();
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange = (e) => {
    e.preventDefault();
    this.setState({lastName: e.target.value});
  }

  handleRegisterEmailChange = (e) => {
    e.preventDefault();
    this.setState({registerEmail: e.target.value});
  }

  handleRegisterPasswordChange = (e) => {
    e.preventDefault();
    this.setState({registerPassword: e.target.value});
  }

  handleConfirmPasswordChange = (e) => {
    e.preventDefault();
    this.setState({confirmPassword: e.target.value});
  }

  handleRegistrationSubmit = ()  => {
    if (!this.state.registerEmail.includes('@') || !this.state.registerEmail.includes('.')){
      this.setState({registrationError: 'Please enter a valid e-mail address'});
    } else if (this.state.registerPassword !== this.state.confirmPassword){
      this.setState({registrationError: 'Please make sure your passwords match'});
    } else {
      api.addUser({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      }).then(resp => {
        if (resp.error){
          this.setState({registrationError: resp.error});
        } else {
          this.setState({
            userId: resp.id,
            registrationError: false,
            firstName: resp.first_name,
            lastName: resp.last_name,
            email: resp.email,
            registerEmail: '',
            registerPassword: ''
          });
          localStorage.setItem('token', this.state.userId)
          this.props.history.push('/portfolio');
        }
      })
    };
  }

  //******************************************************
  // LOGIN/LOGOUT
  //******************************************************

  componentDidMount(){
    const token = localStorage.getItem('token')
    if (token){
      api.findCurrentUser(token)
      .then(resp => {
        console.log(resp)
        this.setState({
          userId: resp.id,
          firstName: resp.first_name,
          lastName: resp.last_name,
          email: resp.email,
          balance: resp.balance,
          purchaseQuantity: null
        })
      })
    } else {
      this.props.history.push('/login');
    }
  }

  handleEmailChange = (e) => {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  handleLoginSubmit = () => {
    api.authUser({
      email: this.state.email,
      password: this.state.password
    }).then(resp => {
      if (resp.error){
        this.setState({loginError: true});
      } else {
        console.log(resp)
        this.setState({
          userId: resp.id,
          firstName: resp.first_name,
          lastName: resp.last_name,
          email: resp.email,
          balance: resp.balance,
          transactions: resp.transactions,
          ownedStocks: resp.owned_stocks
        });
        localStorage.setItem('token', resp.token);
        this.props.history.push('/portfolio');
      }
    })
  }

  handleLogout = () => {
    this.props.history.push('/login');
    localStorage.removeItem('token')
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      registrationError: false,
      loginError: false,
      userId: ''
    });

  }

  //******************************************************
  // PORTFOLIO
  //******************************************************

  handleSearchChange = (e, { value }) => {
    console.log(value)

    this.setState({ symbol:value }, ()=> {
      api.grabStock(this.state.symbol)
      .then(resp => {
        console.log(resp)
        this.setState({results: resp.bestMatches})
      })
    })
  }

  handleResultSelect = (e, data) => {
    console.log(data.result)
    this.setState({
      symbol: data.result['1. symbol'],
      stockName: data.result['2. name'],
    }, () => {
      api.fetchStockInfo(this.state.symbol)
      .then(resp => {
        console.log(resp)
        console.log(resp['Global Quote']['05. price'])
        this.setState({
          latestPrice: resp['Global Quote']['05. price'],
          openingPrice: resp['Global Quote']['02. open'],
          purchaseQuantity: null
        })
      })
    })

  }
  //******************************************************
  // TRANSACTIONS
  //******************************************************

  handlePurchase = (e) => {
    e.preventDefault();

    let total;
    const numberRegex = /^[0-9\b]+$/;

    if (e.target.value === '' || numberRegex.test(e.target.value)){
      this.setState({purchaseQuantity: e.target.value})
      total = (this.state.latestPrice * e.target.value).toFixed(2)
    }

    if (total > parseFloat(this.state.balance)){
      this.setState({enoughFunds: false});
    } else {
      this.setState({enoughFunds: true});
    }
  }

  handlePurchaseSubmit = () => {
    this.setState({totalPrice: (this.state.latestPrice * this.state.purchaseQuantity).toFixed(2)}, () => {
      console.log('here')
      api.buyStocks({
        userId: this.state.userId,
        symbol: this.state.symbol,
        stockName: this.state.stockName,
        latestPrice: this.state.latestPrice,
        purchaseQuantity: this.state.purchaseQuantity,
        totalPrice: this.state.totalPrice
      }).then(resp => this.setState({
        totalQuantity: resp['ownedStock']['total_quantity'],
        balance: resp['balance']
      })
    )})
  }


  //******************************************************
  // render
  //******************************************************
  render(){
    console.log(this.state)
    return (
      <div>
        <Navbar
          userId={this.state.userId}
          firstName={this.state.firstName}
          lastName={this.state.lastName}

          handleLogout={this.handleLogout}
        />
        <Switch>
          {!this.state.userId &&
            <React.Fragment>
              <Route path='/register' render={() => {
                return (
                  <RegistrationPage
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    registerEmail={this.state.registerEmail}
                    registerPassword={this.state.registerPassword}
                    confirmPassword={this.state.confirmPassword}
                    registrationError={this.state.registrationError}

                    handleFirstNameChange={this.handleFirstNameChange}
                    handleLastNameChange={this.handleLastNameChange}
                    handleRegisterEmailChange={this.handleRegisterEmailChange}
                    handleRegisterPasswordChange={this.handleRegisterPasswordChange}
                    handleConfirmPasswordChange={this.handleConfirmPasswordChange}
                    handleRegistrationSubmit={this.handleRegistrationSubmit}
                    />
                )
              }}/>
              <Route path='/login' render={(routerProps) => {
                return (
                  <LoginPage
                    email={this.state.email}
                    password={this.state.password}
                    loginError={this.state.loginError}

                    handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleLoginSubmit={this.handleLoginSubmit}
                  />
                )
              }}/>
            </React.Fragment>
          }
          <Route path='/portfolio' render={(router) => {
            return (
              <Portfolio
                symbol={this.state.symbol}
                isLoading={this.state.isLoading}
                results={this.state.results}
                openingPrice={this.state.openingPrice}
                closingPrice={this.state.closingPrice}
                latestPrice={this.state.latestPrice}
                stockName={this.state.stockName}
                purchaseQuantity={this.state.purchaseQuantity}
                balance={this.state.balance}
                totalPrice={this.state.totalPrice}
                enoughFunds={this.state.enoughFunds}
                totalQuantity={this.state.totalQuantity}

                handleSearchChange={this.handleSearchChange}
                handleResultSelect={this.handleResultSelect}
                handlePurchase={this.handlePurchase}
                handlePurchaseSubmit={this.handlePurchaseSubmit}
              />
            )
          }}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
