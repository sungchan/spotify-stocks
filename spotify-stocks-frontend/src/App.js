import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

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
    // userId: '',
    email: '',
    password: '',
    loginError: false
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
        this.setState({
          userId: resp.id,
          firstName: resp.first_name,
          lastName: resp.last_name,
          email: resp.email
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
          email: resp.email
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
                email={this.state.email}
              />
            )
          }}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
