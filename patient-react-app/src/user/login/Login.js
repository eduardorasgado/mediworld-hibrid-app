import React, { Component } from 'react';
import './Login.css';

//importando los componentes de antd
import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

// componente inteligente
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLoginFormSummit = this.handleLoginFormSummit.bind(this);
    }

    handleLoginFormSummit(event) {
        //
    }
}

// componente tonto o de vista
class Login extends Component {
    render() {
        const AntdLoginForm = Form.create()(LoginForm);

        return(
            <div>
                login
            </div>
        );
    }
}

export default Login;