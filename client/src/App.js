import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRouter'
import Login from './routers/login/login'
import Index from './routers/index/index'
import './App.css'

function App() {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <PrivateRoute path='/' component={Index} />
    </Switch>
  );
}

export default App;
