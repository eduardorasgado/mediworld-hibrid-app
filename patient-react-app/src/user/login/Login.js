import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                    if(error.status === 401) {
                        notification.error({
                            message: 'Mediworld App',
                            description: 'Usuario o contraseña no son correctas. Verifique.'
                        });
                    } else {
                        notification.error({
                            message: 'Mediworld App',
                            description: 'Disculpa, tuvimos un imprevisto, no te preocupes, intentalo más tarde'
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleLoginFormSummit} className="login-form">
                <FormItem> {
                    getFieldDecorator('username', {
                        rules: [{required: true, message: 'Campo no puede estar vacío'}],
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="username"
                            placeholder=" Usuario"
                        >
                        </Input>
                    )
                }
                </FormItem>
                <FormItem> {
                    getFieldDecorator('password', {
                        rules: [{required: true, message: 'Inserte su contraseña por favor.'}]
                    })(
                        <Input
                            prefix={<Icon type="lock"/>}
                            size="large"
                            name="password"
                            placeholder="Contraseña"
                        >
                        </Input>
                    )
                }
                </FormItem>
                <FormItem>
                    <Button type="primary"
                            htmlType="submit"
                            size="large"
                            className="login-form-button"
                     >
                     Entrar
                    </Button>
                    O <Link to="/register">Registrarse</Link>
                </FormItem>
            </Form>
        );
    }
}

export default Login;