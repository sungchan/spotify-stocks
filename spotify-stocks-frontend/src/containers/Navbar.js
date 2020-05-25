import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {


  render(){
    return (
      <React.Fragment>
        {
          this.props.userId &&
          <div>
            Welcome {this.props.firstName} {this.props.lastName}
            <Link to='login' onClick={this.props.handleLogout}>
              Logout
            </Link>
          </div>
        }


      </React.Fragment>
    )
  }
}

export default Navbar;
