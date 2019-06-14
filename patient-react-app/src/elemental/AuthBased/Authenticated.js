import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

const Authenticated = ({component: Component, isAuthenticated, 
                        currentUser, loadCurrentUser}) => (
    <Route
        render={(props) =>
            (localStorage.getItem(ACCESS_TOKEN) !== 'accessToken') ?
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