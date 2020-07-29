import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AddFiles from './AddFiles';
import ShowFile from './ShowFile';
import Register from './Register';
import Login from './Login';



class AppRoutes extends Component {
  render () {
    
    return (
        <Switch>
          <Route exact path="/addFiles" component={ AddFiles } />
          <Route exact path="/showFiles" component={ ShowFile } />
          <Route exact path="/Login" component={ Login } />
          <Route exact path="/Register" component={ Register } />
          <Redirect to="/Login" />
        </Switch>
    );
  }
}

export default AppRoutes;