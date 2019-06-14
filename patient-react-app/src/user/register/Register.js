import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Register.css';

// importando constantes
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH,
        NOMBRE_MAX_LENGTH, NOMBRE_MIN_LENGTH,
        APELLIDOS_MAX_LENGTH, APELLIDOS_MIN_LENGTH,
        EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH, EMAIL_REGEX,
        PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH,
        DATE_FORMAT,
        GENERO_MASCULINO, GENERO_FEMENINO } from '../../constants';

// Importando helpers de api utilities
import { registerPatient } from '../../utils/APIUtilities';
// importando componentes de diseño de Ant
import { Form, Input, Button, notification, DatePicker,
        Radio } from 'antd';

// formato local para el lenguaje componente DatePicker ant design
import locale from 'antd/lib/date-picker/locale/es_ES'

// manipulacion de formatos de tiempo
import moment from 'moment';
import 'moment/locale/es';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/**
 * @class Register
 * @description Componente de Registro de un usuario de tipo paciente, nuevo, captura de todos los datos necesarios
 * para la creacion de la cuenta nueva
 * 
 *  @author Eduardo Rasgado Ruiz
 * @version 1.0
 */
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
            confirmPassword: {
                value: ''
            },
            fechaNacimiento: {
                value: ''
            },
            genero: {
                value: '',
                validateStatus: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.HandleInputChange = this.HandleInputChange.bind(this);
        this.handleDateInput = this.handleDateInput.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        
    }

    /**
     * Metodo que solicita la funcion register patient de api utilities y pasa los datos
     * previamente validados para hacer el request a la API
     */
    handleSubmit(event) {
        // evita que se haga la peticion e intente recargarse la pagina
        event.preventDefault();

        const registerRequest = {
            username: this.state.username.value,
            nombre: this.state.nombre.value,
            apellidos: this.state.apellidos.value,
            fechaNacimiento: this.state.fechaNacimiento.value,
            genero: this.state.genero.value,
            email: this.state.email.value,
            password: this.state.password.value
        }

        registerPatient(registerRequest)
        .then(response => {
            this.props.history.push("/login");

            notification.success({
                message: 'Voilá',
                description: `${this.state.nombre.value}: ${response.message}`
            });
            
        })
        .catch(error => {
            notification.error({
                message: 'Ops!',
                description: 'Algo salió mal en tu registro, intenta más tarde' || error.message
            });
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
     * Maneja la entrada de fecha de nacimiento, manipulando
     * un objeto de tipo Moment.moment, lo valida y guarda
     * @param {*} date 
     * @param {*} format 
     * @param {*} validation 
     */
    handleDateInput(date, format, validation) {
        let dateVal = ''
        if(date) {
             dateVal = date.format();
        }

        this.setState({
            fechaNacimiento: {
                value: dateVal,
                ...validation(date)
            }
        });
    }

    /**
     * Metodo que compreba que todos los campos esten validados correctamente previo a activar
     * el boton de registro
     */
    isFormInvalid() {
        return !(
            this.state.nombre.validateStatus === 'success' &&
            this.state.apellidos.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success' &&
            this.state.confirmPassword.validateStatus === 'success' &&
            this.state.fechaNacimiento.validateStatus === 'success' &&
            this.state.genero.validateStatus === 'success'
        );
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
                    help={this.state.nombre.errorMessage}
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
                    validateStatus={this.state.apellidos.validateStatus}
                    help={this.state.apellidos.errorMessage}
                >
                    <Input
                        size="large"
                        autoComplete="off"
                        name="apellidos"
                        placeholder="Apellidos"
                        value={this.state.apellidos.value}
                        onChange={(event) => this.HandleInputChange(event, this.validateApellidos)}
                    ></Input>
                </FormItem>
                <FormItem
                    validateStatus={this.state.username.validateStatus}
                    help={this.state.username.errorMessage}
                >
                    <Input
                        size="large"
                        autoComplete="off"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={this.state.username.value}
                        onChange={(event) => this.HandleInputChange(event, this.validateUsername)}
                    >
                    </Input>
                </FormItem>
                <FormItem
                    validateStatus={this.state.email.validateStatus}
                    help={this.state.email.errorMessage}
                >
                    <Input
                        size="large"
                        autoComplete="off"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email.value}
                        onChange={(event) => this.HandleInputChange(event, this.validateEmail)}
                    ></Input>
                </FormItem>
                <FormItem
                    validateStatus={this.state.password.validateStatus}
                    help={this.state.password.errorMessage}
                >
                    <Input
                        type="password"
                        size="large"
                        autoComplete="off"
                        name="password"
                        placeholder="Contraseña"
                        value={this.state.password.value}
                        onChange={(event) => this.HandleInputChange(event, this.validatePassword)}
                    >
                    </Input>
                </FormItem>
                <FormItem
                    validateStatus={this.state.confirmPassword.validateStatus}
                    help={this.state.confirmPassword.errorMessage}
                >
                    <Input
                        type="password"
                        size="large"
                        autoComplete="off"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={this.state.confirmPassword.value}
                        onChange={(event) => this.HandleInputChange(event, this.validateConfirmPassword)}
                    >
                    </Input>
                </FormItem>
                <FormItem
                    label="Fecha de nacimiento"
                    validateStatus={this.state.fechaNacimiento.validateStatus}
                    help={this.state.fechaNacimiento.errorMessage}
                >
                    <DatePicker 
                        defaultValue={moment(moment(), DATE_FORMAT)} 
                        format={DATE_FORMAT} 
                        locale={locale}
                        size="large"
                        name="fechaNacimiento"
                        onChange={(date, format) =>
                            this.handleDateInput(date, format, this.validateFechaNacimiento)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Genero"
                >
                    <RadioGroup name="genero"
                                value={this.state.genero.value}
                                onChange={(event) =>
                                    this.HandleInputChange(event, this.validateGenre)
                                }
                                >
                        <Radio value={GENERO_MASCULINO}>Hombre</Radio>
                        <Radio value={GENERO_FEMENINO}>Mujer</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary"
                            htmlType="submit"
                            size="large"
                            className="register-form-button"
                            disabled={this.isFormInvalid()}
                    >Registrarse</Button>
                    <br></br>
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
              errorMessage: `El nombre es muy largo, necesita ser máximo de ${NOMBRE_MAX_LENGTH} caracteres`
          }
      } else if (nombre.length < NOMBRE_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `El nombre es muy corto, necesita ser mínimo de ${NOMBRE_MIN_LENGTH} caracteres`
          }
      } else {
          return {
            validateStatus: 'success',
            errorMessage: null
          }
      }
  }

  /**
   * Metodo que valida la entrada de apellidos, procura que se encuentre entre los parametros deseables,
   * de otro modo emite un estatus y mensaje de error en el retorno
   */
  validateApellidos = (apellidos) => {
      if(apellidos.length > APELLIDOS_MAX_LENGTH){
        return {
            validateStatus: 'error',
            errorMessage: `La entrada es muy larga, se acepta un máximo de ${APELLIDOS_MAX_LENGTH} caracteres`
        }
      } else if(apellidos.length < APELLIDOS_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `La entrada es muy corta, se acepta un mínimo de ${APELLIDOS_MIN_LENGTH} caracteres`
          }
      } else {
          return {
              validateStatus: 'success',
              errorMessage: null
          }
      }
  }

  validateUsername = (username) => {
      // TODO VALIDAR LA DISPONIBILIDAD DEL USERNAME
      if(username.length > USERNAME_MAX_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `Debe ser menor a ${USERNAME_MAX_LENGTH} caracteres`
          }
      } else if(username.length < USERNAME_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `Debe ser mayor a ${USERNAME_MIN_LENGTH} caracteres`
          }
      } else {
          return {
              validateStatus: 'success',
              errorMessage: null
          }
      }
  }

  /**
   * Metodo que valida el size del correo electronico, cada vez que este cambia con la entrada
   * del usuario
   */
  validateEmail = (email) => {
      if(!email){
          return {
              validateStatus: 'error',
              errorMessage: 'El correo no puede dejarse vacío'
          }
      }
      // comprobando que efectivamente se trata de un correo de acuerdo a regular expresion
      if(!EMAIL_REGEX.test(email)){
          return {
              validateStatus: 'error',
              errorMessage: 'Por favor inserta un correo válido'
          }
      }

      // TODO: VALIDAR LA DISPONIBILIDAD DEL EMAIL

      if(email.length > EMAIL_MAX_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `Email demasiado largo, solo máximo de ${EMAIL_MAX_LENGTH} caracteres`
          }
      } 
      
      else if(email.length < EMAIL_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `Email muy corto, el mínimo es de ${EMAIL_MIN_LENGTH} caracteres`
          }
      }

      // si el email pasa todas las validaciones
      else {
        return {
            validateStatus: 'success',
            errorMessage: null
        }
      }
  }

  /**
   * Validacion de password basada en un minimo y maximos de tamaño asi como de una expresion regular
   */
  validatePassword = (password) => {
      if(password.length > PASSWORD_MAX_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `Tu contraseña no debe exceder el máximo de ${PASSWORD_MAX_LENGTH} caracteres`
          }
      } else if(password.length < PASSWORD_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMessage: `Tu contraseña debe de tener un mínimo de ${PASSWORD_MIN_LENGTH} caracteres`
          }
      } else {
          return {
              validateStatus: 'success',
              errorMessage: null
          }
      }
  }

  /**
   * validacion de la coincidencia de las dos contraseñas
   * TODO: Si la contraseña de confirmacion es escrita primero y después se escribe la contraseña normal
   * este cambio no es detectado por la contraseña de confirmacion y por tanto no cambia el mensaje de error de 
   * no coincidencia
   */
  validateConfirmPassword = (confirmPassword) => {
      if(!(confirmPassword === this.state.password.value)) {
          return {
              validateStatus: 'error',
              errorMessage: 'Las contraseñas no coinciden'
          }
      } else {
          return {
            validateStatus: 'success',
            errorMessage: null
          }
      }
  }

  validateFechaNacimiento = (fechaNacimiento) => {
      if(!fechaNacimiento) {
          return {
              validateStatus: 'error',
              errorMessage: 'La fecha de nacimiento no puede estar vacía'
          }
      }
      // comprobando que la fecha no sobrepase del dia de hoy
      if(moment(fechaNacimiento.format()).isAfter(moment().format())) {
        return {
            validateStatus: 'error',
            errorMessage: 'La fecha de nacimiento es invalida'
        }
      }
      return {
          validateStatus: 'success',
          errorMessage: null
      }
  }

  validateGenre = (genero) => {
      if(!genero) {
          return {
              validateStatus: 'error',
              errorMessage: 'Elige el género'
          }
      }
      return {
          validateStatus: 'success',
          errorMessage: null
      }
  }
}
