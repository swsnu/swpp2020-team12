import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {

  // Add your own authentication on the below line.

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} /> //
        )
      }
    />
  )
}



export default PrivateRoute;