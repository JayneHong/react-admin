import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../utils/Session'

//      <PrivateRoute path='/' component={Index} />
const PrivateRouter = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        return isAuthenticated() ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    }} />
}

export default PrivateRouter;

