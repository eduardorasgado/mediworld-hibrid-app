import React, { Component } from 'react';
import './Login.css';

//importando los componentes de antd
import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

// componente tonto o de vista
/**
 * Clase que carga el componente inteligente a traves de un wrapper de Ant design
 */
class Login extends Component {
    render() {
        const AntdLoginForm = Form.create()(LoginForm);

        return(
            <div className="login-container">
                <div className="page-title">
                    <div className="login-content">
                        <AntdLoginForm onLogin={ this.props.onLogin }></AntdLoginForm>
                    </div>
                </div>
            </div>
        );
    }
}

// componente inteligente
/**
 * Clase que representa la logica de obtencion de los datos y token de un usuario que ha
 * ingresado sus datos en la aplicacion
 */
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLoginFormSummit = this.handleLoginFormSummit.bind(this);
    }

    handleLoginFormSummit(event) {
        event.preventDefault();
    }
}

export default Login;