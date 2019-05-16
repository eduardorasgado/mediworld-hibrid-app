import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthPage extends Component {
    render() {
        return(
            <div className="container">
                <Link to="/login">Iniciar Sesión</Link>
                <br></br>
                <Link to="/">Registrarse con tu cuenta Google</Link>
                <br></br>
                <Link to="/register">Crear una cuenta</Link>
                <br></br>
            </div>
        );
    }
}

export default AuthPage;
