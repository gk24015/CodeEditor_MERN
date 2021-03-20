import React, { Fragment, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import login from "./login.svg";
import Navbar from "../layout/Navbar.js"
export const Login = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      
    });
  
    const { email, password } = formData;
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   
    const onSubmit = async (e) => {
      e.preventDefault();
     
        console.log('Success login');//register({ name, email, password });
      
    };
    
    return (
        <Fragment>
    
    
    
    <div className="container">
        
        <div className="row" style={{marginTop:"4rem"}}>   

        <div className="col s3">
          <img src={login} alt="login" width="450px" style={{marginLeft:"30px", marginTop:"100px"}}/>
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

export default Login;