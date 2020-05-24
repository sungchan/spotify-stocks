import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

class LoginPage extends React.Component {

  render(){
    return (
      <React.Fragment>
        <Form onSubmit={this.props.handleLoginSubmit}>
          <Form.Field>
            <label> E-mail: </label>
            <input placeholder = 'E-mail' value = {this.props.email} onChange={this.props.handleEmailChange}/>
          </Form.Field>
          <Form.Field>
            <label> Password: </label>
            <input placeholder = 'Password' value = {this.props.password} onChange={this.props.handlePasswordChange} type='password'/>
          </Form.Field>
          <Button
            content='Log In'
            primary
            fluid
            size='huge'
            type='submit'
            disabled={!this.props.email
                || !this.props.password
            }
          />
        </Form>
      </React.Fragment>
    )
  }
}

export default LoginPage;
