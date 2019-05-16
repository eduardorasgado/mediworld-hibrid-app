import React, { Component } from 'react'

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

  render() {
    return (
      <div>
        Registrate hoy mismo
      </div>
    )
  }
}
