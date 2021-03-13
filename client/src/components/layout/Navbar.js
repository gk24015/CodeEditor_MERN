import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper" style={{background:"#1E1F26"}}>
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

          </div>
        </nav>
      </div>
    );
  }

export default Navbar;