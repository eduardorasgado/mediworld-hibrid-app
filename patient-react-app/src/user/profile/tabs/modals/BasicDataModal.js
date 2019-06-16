
import React, { Component } from 'react'
import { GENERO_FEMENINO, GENERO_MASCULINO, DATE_FORMAT } from '../../../../constants';
import { Modal, Button, Input, Form, Radio, Select, DatePicker } from 'antd';
import '../DatosTab.css';

// manipulacion de formatos de tiempo
import locale from 'antd/lib/date-picker/locale/es_ES';
import moment from 'moment';
import 'moment/locale/es';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Option} = Select;

export default class BasicDataModal extends Component {
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
            // visibilidad de los modales
            basicModalVisible: this.props.isVisible,
            // loading de los modales
            basicModalLoading: this.props.basicModalLoading,
        }
    }


    render(){
        return (
            <Modal
                className="modal-visible"
                visible={this.props.basicModalVisible}
                title="Datos básicos"
                onOk={this.props.handleOkBasicModal}
                onCancel={this.props.handleCancelBasicModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelBasicModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.basicModalLoading} 
                    onClick={this.props.handleOkBasicModal}>
                Submit
                </Button>,
                ]}
                >
                <Form className="register-form" 
                onSubmit={() => {this.props.handleBasicSubmit()}}>
                <FormItem
                >
                    <Input
                        size="large"
                        name="nombre"
                        autoComplete="off"
                        placeholder="Nombre"
                        value={this.props.informacion_basica.nombre}
                        onChange={(event) => this.props.handleInputChange(event)}
                    ></Input>
                </FormItem>
                <FormItem>
                    <Input
                        size="large"
                        name="apellidos"
                        autoComplete="off"
                        placeholder="Apellidos"
                        value={this.props.informacion_basica.apellidos}
                        onChange={(event) => this.props.handleInputChange(event)}
                    ></Input>
                </FormItem>
                <FormItem>
                    <Input
                        size="large"
                        name="estatura"
                        autoComplete="off"
                        placeholder="Estatura en centimetros"
                        value={this.props.informacion_basica.estatura}
                        onChange={(event) => this.props.handleInputChange(event)}
                    ></Input>
                </FormItem>
                <FormItem>
                    <Input
                        size="large"
                        name="peso"
                        autoComplete="off"
                        placeholder="Peso en Kilogramos"
                        value={this.props.informacion_basica.peso}
                        onChange={(event) => this.props.handleInputChange(event)}
                    ></Input>
                </FormItem>

                <FormItem>
                    <RadioGroup name="genero"
                                size="large"
                                value={this.props.informacion_basica.genero}
                                onChange={(event) =>
                                    this.props.handleInputChange(event)
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
                        value={moment(this.props.informacion_basica.fechaNacimiento)}
                        name="fechaNacimiento"
                        onChange={(date, format) =>
                            this.props.handleDateInput(date, format)
                        }
                    />
                </FormItem>
                <FormItem>
                    <label>País de nacimiento</label>
                    <Select
                        className="select-country"
                        
                        placeholder="Selecciona tu país de nacimiento"
                        value={this.props.informacion_basica.paisNacimiento}
                        showSearch
                        name="paisNacimiento"
                        
                        optionFilterProp="value"
                        onSelect={
                            this.props.handleCountryChange
                        }
                        
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.props.availableCountries.map((country) => (
                            <Option key={country} value={country}>{country}</Option>
                        ))}
                    </Select>
                </FormItem>
                </Form>
            </Modal>
        );
    }
}