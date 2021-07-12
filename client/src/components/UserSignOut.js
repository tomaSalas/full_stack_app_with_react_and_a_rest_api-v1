import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
    // use context to access UserSignOut
    // use React Hook
    useEffect(() => context.actions.signOut());
  
    return (
      <Redirect to="/" />
    );
  }

