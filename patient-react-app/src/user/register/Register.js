import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// importando constantes
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH,
        NOMBRE_MAX_LENGTH, NOMBRE_MIN_LENGTH,
        APELLIDOS_MAX_LENGTH, APELLIDOS_MIN_LENGTH,
        EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH,
        PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH,
        GENERO_MASCULINO, GENERO_FEMENINO } from '../../constants';

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
     * Metodo que renderiza cada cambio en los campos, obtiene el valor del campo cada
     * vez que se escribe y actualiza el estado y mensaje a mostrar en el campo
     * @param {*} event 
     * @param {*} validation 
     */
    HandleInputChange(event, validation){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        // un estado y un mensaje son agregados al objeto
        this.setState({
            [inputName]: {
                value: inputValue,
                ...validation(inputValue)
            }
        })

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
                <FormItem
                    validateStatus={this.state.nombre.validateStatus}
                    help={this.state.nombre.errorMsg}
                >
                    <Input
                        size="large"
                        name="nombre"
                        autoComplete="off"
                        placeholder="Nombre"
                        value={this.state.nombre.value}
                        onChange={(event) => this.HandleInputChange(event, this.validateName)}
                    ></Input>
                </FormItem>
                <FormItem
                    label="Apellidos"
                ></FormItem>
                <FormItem
                    label="Email"
                ></FormItem>
                <FormItem
                    label="Contraseña"
                ></FormItem>
                <FormItem
                    label="Confirmar Contraseña"
                ></FormItem>
                <FormItem
                    label="Fecha de nacimiento"
                ></FormItem>
                <FormItem
                    label="Genero"
                ></FormItem>
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

  // ---------- FUNCIONES DE VALIDACION DE CAMPOS

  /**
   * Metodo que valida el tamaño del nombre cada vez que se registra un cambio en el campo,
   * retorna un estado y un mensaje
   */
  validateName = (nombre) => {
      if(nombre.length > NOMBRE_MAX_LENGTH) {
          return {
              validateStatus: 'error',
              errorMsg: `El nombre es muy largo, necesita ser máximo de ${NOMBRE_MAX_LENGTH} caracteres`
          }
      } else if (nombre.length < NOMBRE_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMsg: `El nombre es muy corto, necesita ser mínimo de ${NOMBRE_MIN_LENGTH} caracteres`
          }
      } else {
          return {
            validateStatus: 'success',
            errorMsg: null
          }
      }
  }
}
