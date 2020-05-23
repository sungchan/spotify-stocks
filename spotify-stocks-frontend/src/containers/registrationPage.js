import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

class RegistrationPage extends React.Component {

  render(){
    return (
      <React.Fragment>
        <Form error={this.props.registrationError} onSubmit={this.props.handleRegistrationSubmit}>
          <Form.Field>
            <label> Name: </label>
            <input placeholder = "First Name" value = {this.props.firstName} onChange={this.props.handleFirstNameChange}/>
            <input placeholder = "Last Name" value = {this.props.lastName} onChange={this.props.handleLastNameChange}/>
          </Form.Field>
          <Form.Field>
            <label> E-mail: </label>
            <input placeholder = 'E-mail' value = {this.props.email} onChange={this.props.handleEmailChange}/>
          </Form.Field>
          <Form.Field>
            <label> Password: </label>
            <input placeholder = 'Password' value = {this.props.password} onChange={this.props.handlePasswordChange} type='password'/>
            <input placeholder = 'Confirm Password' value = {this.props.confirmPassword} onChange={this.props.handleConfirmPasswordChange} type='password'/>
          </Form.Field>
          <Message
            error
            content={this.props.registrationError}
          />
          <Button
            primary
            fluid
            size='huge'
            type='submit'
            disabled={!this.props.firstName
                || !this.props.lastName
                || !this.props.email
            }
          />
        </Form>
      </React.Fragment>
    )
  }
}

export default RegistrationPage;
