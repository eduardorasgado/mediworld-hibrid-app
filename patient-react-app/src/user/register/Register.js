import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// Importando helpers de api utilities
import { registerPatient } from '../../APIUtilities';
// importando componentes de diseño de Ant
import { Form, Input, Button, notification } from 'antd';

const FormItem = Form.Item;

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: {
                value: ''
            },
            nombre: {
                value: ''
            },
            apellidos: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            // TODO: CHECAR COMPONENTE DISPONIBLE EN ANT DESIGN
            fechaNacimiento: {
                value: ''
            },
            genero: {
                value: ''
            }
        }
    }

    /**
     * Metodo que solicita la funcion register patient de api utilities y pasa los datos
     * previamente validados para hacer el request a la API
     */
    handleSubmit() {
        notification.success({
            message: "Mediworld App Registration",
            description: "Se ha registrado exitosamente"
        });
    }

    /**
     * Metodo que compreba que todos los campos esten validados correctamente previo a activar
     * el boton de registro
     */
    isFormInvalid() {
        return false;
    }

  render() {
    return (
      <div className="register-container">
        <div className="back-button">
            <h4>
                <Link to="/start-over-here">Atrás</Link>
            </h4>
        </div>
        <h1 className="page-title">Crear una cuenta nueva</h1>
        
        <div className="register-content">
            <Form className="register-form" onSubmit={this.handleSubmit}>
                <FormItem>
                    <Button type="primary"
                            htmlType="submit"
                            size="large"
                            className="register-form-button"
                            disabled={this.isFormInvalid()}
                    >Registrarse</Button>
                    Ya está registrado? <Link to="/login">Entrar</Link>
                </FormItem>
            </Form>
        </div>
      </div>
    )
  }
}
