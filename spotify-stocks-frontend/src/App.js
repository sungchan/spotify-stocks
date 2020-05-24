import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import api from './services/api';

import RegistrationPage from './containers/RegistrationPage';
import LoginPage from './containers/LoginPage';
import Navbar from './containers/Navbar';

class App extends React.Component {
  state = {
    // *** REGISTRATION STATES ***
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    registrationError: false,
    loginError: false
  }

  handleFirstNameChange = (e) => {
    e.preventDefault();
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange = (e) => {
    e.preventDefault();
    this.setState({lastName: e.target.value});
  }

  handleEmailChange = (e) => {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  handleConfirmPasswordChange = (e) => {
    e.preventDefault();
    this.setState({confirmPassword: e.target.value});
  }

  handleRegistrationSubmit = ()  => {
    if (!this.state.email.includes('@', '.')){
      this.setState({registrationError: 'Please enter a valid e-mail address'});
    } else if (this.state.password !== this.state.confirmPassword){
      this.setState({registrationError: 'Please make sure your passwords match'});
    } else {
      api.addUser({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      });
      this.setState({registrationError: false});
    };
  }

  handleLoginSubmit = () => {
    api.authUser({
      email: this.state.email,
      password: this.state.password
    }).then(resp => {
      if (resp.error){
        this.setState({loginError: true})
      } else {
        console.log('success')
      }
    })
  }

  render(){
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route path='/register' render={() => {
            return (
              <RegistrationPage
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                registrationError={this.state.registrationError}

                handleFirstNameChange={this.handleFirstNameChange}
                handleLastNameChange={this.handleLastNameChange}
                handleEmailChange={this.handleEmailChange}
                handlePasswordChange={this.handlePasswordChange}
                handleConfirmPasswordChange={this.handleConfirmPasswordChange}
                handleRegistrationSubmit={this.handleRegistrationSubmit}
              />
            )
          }}/>
          <Route path='/login' render={() => {
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
        </Switch>
      </div>
    )
  }
}

export default App;
