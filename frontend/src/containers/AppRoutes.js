import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AddFiles from './AddFiles';
import ShowFile from './ShowFile';
import Error404 from '../app/user-pages/Error404';
import Error500 from '../app/user-pages/Error500';
import Login from './Login';
import Register1 from './Register';
import BlankPage from '../app/user-pages/BlankPage';



class AppRoutes extends Component {
  render () {
    
    return (
        <Switch>
          <Route exact path="/addFiles" component={ AddFiles } />
          <Route exact path="/showFiles" component={ ShowFile } />
          <Route exact path="/Login" component={ Login } />
          <Route exact path="/Register" component={ Register1 } />
          <Route path="/user-pages/error-404" component={ Error404 } />
          <Route path="/user-pages/error-500" component={ Error500 } />
          <Route path="/user-pages/blank-page" component={ BlankPage } />
          <Redirect to="/Login" />
        </Switch>
    );
  }
}

export default AppRoutes;