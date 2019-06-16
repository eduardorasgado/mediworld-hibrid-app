import React, { Component } from 'react'
import { getAllCountries } from '../../../utils/APIUtilities';
import { GENERO_FEMENINO, GENERO_MASCULINO, DATE_FORMAT } from '../../../constants';
import { Modal, Button, Icon, Row, Col, Avatar, Input, Form, Radio, Select, DatePicker } from 'antd';
import './DatosTab.css';
import locale from 'antd/lib/date-picker/locale/es_ES';

// manipulacion de formatos de tiempo
import moment from 'moment';
import 'moment/locale/es';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Option} = Select;


export default class DatosTab extends Component {
    constructor(props){
        super(props);

        this.state = {
            informacion_basica: {
                nombre: this.props.currentUser.nombre,
                apellidos: this.props.currentUser.apellidos,
                estatura: '',
                peso: '',
                genero: this.props.currentUser.genero,
                fechaNacimiento: this.props.currentUser.fechaNacimiento,
                paisNacimiento: this.props.currentUser.paisNacimiento
            },
            informacion_personal: {},
            informacion_medica_publica: {},
            // visibilidad de los modales
            basicModalVisible: false,
            // loading de los modales
            basicModalLoading: false,
            availableCountries: []
        }
        this.showBasicModal = this.showBasicModal.bind(this);
        this.handleOkBasicModal = this.handleOkBasicModal.bind(this);
        this.getAvailalableCountries = this.getAvailalableCountries.bind(this);
        this.handleBasicSubmit = this.handleBasicSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.handleDateInput = this.handleDateInput.bind(this);
    }

    componentDidMount(){
        this.getAvailalableCountries();
    }
    /**
     * Funcion que manda a llamar la api de pacientes y medicos para obtener paises disponibles
     */
    getAvailalableCountries() {
        getAllCountries()
        .then(response => {
            const countries = [...response].map(country => {
                return country.name;
            });
            this.setState({
                availableCountries: countries
            })
        })

    }

    showBasicModal() {
        this.setState({
            basicModalVisible: true
        });
    }

    handleOkBasicModal() {
        this.setState({
            basicModalLoading: true
        });
        setTimeout(() => {
            console.log("OK")
            this.setState({
                basicModalLoading:false,
                basicModalVisible: false
            });
        }, 1000);
    }

    handleCancelBasicModal() {
        this.setState({
            basicModalVisible:false
        });
    }

    handleInputChange(event) {
        const target = event.target;
        let inputName = target.name;
        const inputValue = target.value;
        
        let informacionBasica = this.state.informacion_basica;
        informacionBasica[inputName] = inputValue;
        this.setState({
            informacion_basica: informacionBasica
        });

        console.log(this.state.informacion_basica.nombre);
    }

    handleCountryChange(value) {
        if(value !== null && value !== ''){
            let informacionBasica = this.state.informacion_basica;
            informacionBasica.paisNacimiento = value;
            this.setState({
                informacion_basica: informacionBasica
            });
        }
        console.log(this.state.informacion_basica.paisNacimiento);
    }

    handleBasicSubmit() {
        console.log("s");
    }

    onBlur() {
        console.log('blur');
      }

    onFocus() {
        console.log('focus');
      }
      
    onSearch(val) {
        console.log('search:', val);
      }

    handleDateInput(date, format) {
        let dateVal = ''
        if(date) {
                dateVal = date.format();
        }
        let informacionBasica = this.state.informacion_basica;
        informacionBasica.fechaNacimiento = dateVal;
        this.setState({
            informacion_basica: informacionBasica
        });
        console.log(this.state.informacion_basica.fechaNacimiento)
    }

    render() {
        return (
            <Row>
                <Col span={10}>
                    <div className="avatar-container">
                        <Avatar size={104} icon="user" />
                    </div>
                </Col>
                <Col span={14}>
                <div className="basic-container">
                    <br></br>   
                    <Button onClick={() => {this.showBasicModal()}} 
                        className="btn-data-show">Información básica <Icon type="right" /></Button>

                    <Button className="btn-data-show">Información personal <Icon type="right" /></Button>
                    
                    <Button className="btn-data-show small-btn">Información médica pública <Icon type="right" /></Button>

                    <Modal
                        className="modal-visible"
                        visible={this.state.basicModalVisible}
                        title="Datos básicos"
                        onOk={this.handleOkBasicModal}
                        onCancel={this.handleCancelBasicModal}
                        footer={[
                            <Button key="back" onClick={() => {this.handleCancelBasicModal()}}>
                            Return
                            </Button>,
                            <Button key="submit" type="primary" 
                                loading={this.state.basicModalLoading} 
                                onClick={this.handleOkBasicModal}>
                            Submit
                            </Button>,
                        ]}
                        >
                            <Form className="register-form" 
                                onSubmit={() => {this.handleBasicSubmit()}}>
                                <FormItem
                                >
                                    <Input
                                        size="large"
                                        name="nombre"
                                        autoComplete="off"
                                        placeholder="Nombre"
                                        value={this.state.informacion_basica.nombre}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        size="large"
                                        name="apellidos"
                                        autoComplete="off"
                                        placeholder="Apellidos"
                                        value={this.state.informacion_basica.apellidos}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        size="large"
                                        name="estatura"
                                        autoComplete="off"
                                        placeholder="Estatura"
                                        value={this.state.informacion_basica.estatura}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                </FormItem>
                                <FormItem>
                                    <Input
                                        size="large"
                                        name="peso"
                                        autoComplete="off"
                                        placeholder="Peso"
                                        value={this.state.informacion_basica.peso}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                </FormItem>
                               
                                <FormItem>
                                    <RadioGroup name="genero"
                                                size="large"
                                                value={this.state.informacion_basica.genero}
                                                onChange={(event) =>
                                                    this.handleInputChange(event)
                                                }
                                                >
                                        <Radio value={GENERO_MASCULINO}>Hombre</Radio>
                                        <Radio value={GENERO_FEMENINO}>Mujer</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem>
                                    <label>Fecha de nacimiento</label>
                                    <DatePicker 
                                        defaultValue={moment(moment(), DATE_FORMAT)} 
                                        format={DATE_FORMAT} 
                                        locale={locale}
                                        size="large"
                                        value={moment(this.state.informacion_basica.fechaNacimiento)}
                                        name="fechaNacimiento"
                                        onChange={(date, format) =>
                                            this.handleDateInput(date, format)
                                        }
                                    />
                                </FormItem>
                                <FormItem>
                                    <label>País de nacimiento</label>
                                    <Select
                                        className="select-country"
                                        
                                        placeholder="Selecciona tu país de nacimiento"
                                        value={this.state.informacion_basica.paisNacimiento}
                                        showSearch
                                        name="paisNacimiento"
                                        
                                        optionFilterProp="value"
                                        onSelect={
                                            this.handleCountryChange
                                        }
                                        onFocus={() => {this.onFocus()}}
                                        onBlur={() => {this.onBlur()}}
                                        onSearch={() => {this.onSearch()}}
                                        filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.availableCountries.map((country) => (
                                            <Option key={country} value={country}>{country}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Form>
                        </Modal>
                </div>
                </Col>
            </Row>
        )
    }
}
