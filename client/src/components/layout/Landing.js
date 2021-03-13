import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "./Coder.svg";
import "./Landing.css"
import Navbar from "./Navbar"



class Landing extends Component {
  render() {
    
    return (
      <div>
      <Navbar/>
      <div style={{padding:"4em"}}>
        <div className="left">
        <h2>A place to build,<br></br> test, and discover front-<br></br>end code.</h2>
        <h6 style={{marginBottom:"1em"}}>CodeMonks is a social development environment for front-end<br></br> designers and developers. Build and deploy a website, show off <br></br>your work, build test cases to learn and debug, and find<br></br> inspiration.</h6>
        <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable accent-3"
                style={{marginBottom:"3em", background:"#00BFA6", color:"#000", fontWeight:"bold", textTransform:"capitalize", borderRadius:"8px"}}
              >
                Sign Up
              </Link>
              <div style={{display:"flex", justify:"center"}}><h6 style={{fontWeight:"bold"}}>Already a member?</h6>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable accent-3"
                style={{marginLeft:"3em", background:"#444857", textTransform:"capitalize", borderRadius:"8px"}}
              >
                Log in
              </Link>
              </div>
        </div>
        <div className="right">
          <img src={img} alt="image" width="500px"/>
        </div>
      </div>
      </div>
    );
  }
}

export default Landing;