import React, { Component } from 'react'
import { Modal, Button, Icon, Row, Col, Avatar, Input, Form } from 'antd';
import './DatosTab.css';
const FormItem = Form.Item;

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
                pais: ''
            },
            informacion_personal: {},
            informacion_medica_publica: {},
            // visibilidad de los modales
            basicModalVisible: false,
            // loading de los modales
            basicModalLoading: false
        }
        this.showBasicModal = this.showBasicModal.bind(this);
        this.handleOkBasicModal = this.handleOkBasicModal.bind(this);
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
        console.log(event);
    }

    handleBasicSubmit() {
        console.log("s");
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
                                    <Input
                                        size="large"
                                        name="apellidos"
                                        autoComplete="off"
                                        placeholder="Apellidos"
                                        value={this.state.informacion_basica.apellidos}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                    <Input
                                        size="large"
                                        name="estatura"
                                        autoComplete="off"
                                        placeholder="Estatura"
                                        value={this.state.informacion_basica.estatura}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                    <Input
                                        size="large"
                                        name="peso"
                                        autoComplete="off"
                                        placeholder="Peso"
                                        value={this.state.informacion_basica.peso}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                    <Input
                                        size="large"
                                        name="genero"
                                        autoComplete="off"
                                        placeholder="Genero"
                                        value={this.state.informacion_basica.genero}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                    <Input
                                        size="large"
                                        name="fechaNacimiento"
                                        autoComplete="off"
                                        placeholder="Fecha de nacimiento"
                                        value={this.state.informacion_basica.fechaNacimiento}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                    <Input
                                        size="large"
                                        name="pais"
                                        autoComplete="off"
                                        placeholder="Pais"
                                        value={this.state.informacion_basica.pais}
                                        onChange={(event) => this.handleInputChange(event)}
                                    ></Input>
                                </FormItem>
                            </Form>
                        </Modal>
                </div>
                </Col>
            </Row>
        )
    }
}
