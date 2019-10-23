import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRouter'
import Login from '../src/routers/Login/Login'
import Index from './routers/Index'
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
