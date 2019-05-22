import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({component: Component, isAuthenticated}) => (
    <Route
        render={(props) =>
            isAuthenticated ?
            <Component {...props}></Component>
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