import React, {Fragment,useEffect} from 'react';
import  { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Navbar from './components/layout/Navbar';
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
//Redux
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import {loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token)
setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
   
  }, []);
     return (
      <Provider store={store}>
         <Router>
           <Fragment>
             <Navbar/>
           
           <section className="container">
             <Alert/>
              <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              </Switch>
           </section>
            
           </Fragment>
         </Router>
         </Provider>
     );
   }
  
 

export default App;
