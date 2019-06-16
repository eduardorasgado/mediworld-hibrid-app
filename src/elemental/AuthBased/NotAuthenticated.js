import React from 'react';
import { ACCESS_TOKEN } from '../../constants';

import { Route,
        Redirect } from 'react-router-dom';

/**
 * @class NotAuthenticated
 * Componente logico que renderiza un componente dado que el usuario no esté autenticado
 * 
 * @author Eduardo Rasgado Ruiz
 */
const NotAuthenticated = ({component:Component, isAuthenticated,
                        ...rest      
}) => (

    <Route
        render={(props) =>
            (localStorage.getItem(ACCESS_TOKEN) !== null) ? (
                <Redirect
                    to={{
                        pathname: '/paciente/me',
                        state: {from: props.location}
                    }}
                ></Redirect>
            ) : (
                <Component
                    {...rest} {...props}
                ></Component>
            )
        }
    ></Route>
)

export default NotAuthenticated;