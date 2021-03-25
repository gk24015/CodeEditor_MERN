import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated , loading }, logout }) => {
  const authLinks = (
    <ul>
     
      <li>
      <Link
                to="/dashboard"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  fontSize: 18
                }}
               // className="btn btn-large waves-effect waves-light hoverable accent-3"
               // style={{marginBottom:"3em", background:"#00BFA6", color:"#000", fontWeight:"bold", textTransform:"capitalize", borderRadius:"8px"}}
              >
                Dashboard
              </Link>
      </li>
      <li>
        <a onClick={logout} href="#!" style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  fontSize: 18

                }}
               // className="btn btn-large waves-effect waves-light hoverable accent-3"
               // style={{marginBottom:"3em", background:"#00BFA6", color:"#000", fontWeight:"bold", textTransform:"capitalize", borderRadius:"8px"}}
               >
         Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
       <li>
        <a href='#!'>Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      
      <h1>
        
      <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center white-text"
            >
              <i className="material-icons">code</i>
              CODEMONKS
            </Link>
      
      
      </h1>
      {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);