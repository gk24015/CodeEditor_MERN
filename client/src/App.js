import React, {Fragment} from 'react';
import  { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
class App extends Component {
   render() {
     return (
      
         <Router>
           <div className="App">
           <Route exact path="/" component={Landing} />
           <section className="container">
              <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              </Switch>
           </section>
            
           </div>
         </Router>
  
     );
   }
 }

export default App;
