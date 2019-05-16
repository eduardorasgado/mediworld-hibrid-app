import React, { Component } from 'react';
import './Login.css';
import { ACCESS_TOKEN } from '../../constants';

// importando utilidades de la api
import { loginPatient } from '../../APIUtilities'; 

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
                <h1 className="page-title">Entrar</h1>
                <div className="login-content">
                    <AntdLoginForm onLogin={ this.props.onLogin }></AntdLoginForm>
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

    /**
     * Metodo que se encarga de tomar los datos ya validados del formulario
     * wrapper de Ant design y solicita la autenticacion a la api mediante el metodo
     * loginPatient de APIUtilities.
     * @param {*} event 
     */
    handleLoginFormSummit(event) {
        event.preventDefault();
        this.props.form.validateFields((error, values) =>{
            if(!error) {
                const loginRequest = Object.assign({}, values);
                loginPatient(loginRequest)
                .then(response => {
                    // recibimos el token de la api y se guarda en el local storage
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    // se manda a llamar el metodo del padre: App
                    this.props.onLogin();
                })
                .catch(error => {
                    console.log("error");
                });
            }
        });
    }
}

export default Login;