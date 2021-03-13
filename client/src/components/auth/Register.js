import React, { Fragment, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import register from "./register.svg";

export const Register = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
    });
  
    const { name, email, password, password2 } = formData;
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   
    const onSubmit = async (e) => {
      e.preventDefault();
      if (password !== password2) {
        console.log("password donot match");//setAlert('Passwords do not match', 'danger');
      } else {
        console.log(formData);//register({ name, email, password });
      }
    };
    
    return (
        <Fragment>
    <div className="container">
        <div className="row" style={{marginTop:"4rem"}}>   

        <div className="col s3">
          <img src={register} alt="register" width="450px" style={{marginLeft:"30px", marginTop:"100px"}}/>
        </div>     
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user" /> Create Your Account
          </p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                style={{color:"white"}}
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                style={{color:"white"}}
                value={email}
                onChange={onChange}
                
              />
              <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                style={{color:"white"}}
                value={password2}
                onChange={onChange}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>

          </p>
          <p className="my-1">
            Go back to home page!!  <Link to="/">CodeMonks</Link>
            
          </p>
          </div>
          </div>
        </Fragment>
      );
    
}

export default Register;