import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../PrivateRouter'
import Home from '../../routers/home/home'
import About from '../../routers/about/about'

class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>
          <PrivateRoute exact path='/home/about' component={About}/>
          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain