import React from 'react';

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
            isAuthenticated ? (
                <Redirect
                    to={{
                        pathname: '/',
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