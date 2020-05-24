import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {


  render(){
    return (
      <React.Fragment>
        {
          this.props.userId &&
          <Link to='login' onClick={this.props.handleLogout}>
            Logout
          </Link>
        }


      </React.Fragment>
    )
  }
}

export default Navbar;
