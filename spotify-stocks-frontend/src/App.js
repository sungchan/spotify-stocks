import React from 'react';
import './App.css';

import api from './services/api';

import LoginPage from './containers/loginPage';

class App extends React.Component {
  state = {
    // *** REGISTRATION STATES ***
    loggedIn: false,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    error: false
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

  handleRegistrationSubmit = (firstName, lastName, email, password)  => {
    api.addUser(firstName, lastName, email, password);
  }

  render(){
    return (
      <div>
        <LoginPage
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          error={this.state.error}

          handleFirstNameChange={this.handleFirstNameChange}
          handleLastNameChange={this.handleLastNameChange}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          handleConfirmPasswordChange={this.handleConfirmPasswordChange}
          handleRegistrationSubmit={this.handleRegistrationSubmit}
        />
      </div>
    )
  }
}

export default App;
