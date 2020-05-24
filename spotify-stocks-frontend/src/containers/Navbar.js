import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {


  render(){
    return (
      <React.Fragment>
        <Link to='login'>
          Login
        </Link>
        <Link to='register'>
          Register
        </Link>

      </React.Fragment>
    )
  }
}

export default Navbar;
