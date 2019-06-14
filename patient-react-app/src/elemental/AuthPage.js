import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css';
import { Avatar } from 'antd';

class AuthPage extends Component {
    render() {
        return(
            <div className="container4">
                <p>
                    <span className="tip"><Link to="/login"><Avatar size="small" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> Iniciar Sesión</Link></span>
                    <br></br><br></br>
                    <span className="tip"><Link to="/"><span className="tiptext">Registrarse con tu cuenta Google</span></Link></span>
                    <br></br><br></br>
                    <span className="tip"><Link to="/register"><Avatar shape="square" size="small" icon="user" /> Crear una cuenta</Link></span>
                    <br></br><br></br>
                </p>
            </div>
        );
    }
}

export default AuthPage;
