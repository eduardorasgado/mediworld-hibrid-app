import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({component: Component, isAuthenticated, 
                        currentUser, loadCurrentUser}) => (
    <Route
        render={(props) =>
            isAuthenticated ?
            <Component currentUser={currentUser} 
                        loadCurrentUser={loadCurrentUser} 
                        {...props}>
            </Component>
            :
            <Redirect to={{
                pathname:'/login',
                state: props.location
            }}></Redirect>
        }
    >
    </Route>
);

export default Authenticated;