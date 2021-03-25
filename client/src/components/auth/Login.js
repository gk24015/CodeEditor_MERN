import React, { Fragment, useState } from 'react';
import { Link, withRouter ,Redirect} from "react-router-dom";
import classnames from "classnames";
import login_ from "./login1.svg";
import Navbar from "../layout/Navbar.js"
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
export const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      
    });
  
    const { email, password } = formData;
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   
    const onSubmit = async (e) => {
      e.preventDefault();
      login(email,password);
     
        //console.log('Success login');
        //register({ name, email, password });
      
    };
    //Redirect if logged in
    if(isAuthenticated)
    {
      return <Redirect to="/dashboard"/>
    }
    return (
        <Fragment>
    
    
    
    <div className="container">
        
        <div className="row" style={{marginTop:"4rem"}}>   

        <div className="col s3">
          <img src={login_} alt="login" width="450px" style={{marginLeft:"30px", marginTop:"100px"}}/>
        </div>     
          <h1 className="large text-primary">Login</h1>
         
          <form className="form" onSubmit={onSubmit}>
            
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                style={{color:"white"}}
                value={email}
                onChange={onChange}
                
              />
              
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                style={{color:"white"}}
                value={password}
                onChange={onChange}
              />
            </div>
            
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Donot have an account? <Link to="/register">Sign In</Link>

          </p>
          <p className="my-1">
            Go back to home page!!  <Link to="/">CodeMonks</Link>
            
          </p>
          </div>
          </div>
          
        </Fragment>
      );
    
}
Login.propTypes={
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);