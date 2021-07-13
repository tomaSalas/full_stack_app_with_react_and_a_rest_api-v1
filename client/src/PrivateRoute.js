//I USE treehouse code here

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            /*state property value is current location of the route user tried to access
            holds information about the user's current location (i.e., the current browser URL). 
            That way, if authentication is successful, the router can redirect the user back to 
            the original location (from: props.location)
            */
            <Redirect to={{
              pathname: '/forbidden',
              state: {from: props.location}, 

            }} />
          )
          }
        />
      )}
    </Consumer>
  );
};

//above sends authenticated user to what's defiend in component route or redirects to sign in
// if user is not authenticated
