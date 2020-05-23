import React from 'react';
import './App.css';

import api from './services/api';

import RegistrationPage from './containers/registrationPage';

class App extends React.Component {
  state = {
    // *** REGISTRATION STATES ***
    loggedIn: true,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    registrationError: false
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
    console.log('wooo')
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
      this.setState({registrationError: false, loggedIn: true});
    };
  }

  render(){
    return (
      <div>
        {!this.state.loggedIn &&
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
        }
      </div>
    )
  }
}

export default App;
