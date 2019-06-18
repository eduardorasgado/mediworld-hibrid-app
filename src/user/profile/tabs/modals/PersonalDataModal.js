import React, { Component } from 'react'
import { Modal, Button, Form, Input, Checkbox, Row, Col } from 'antd';
import '../DatosTab.css';
import './PersonalDataModal.css';
const FormItem = Form.Item;

export default class PersonalDataModal extends Component {

    render() {
        return (
            <Modal
                className="modal-visible"
                visible={this.props.personalModalVisible}
                title="Datos Personales"
                onOk={this.props.handleOkPersonalModal}
                onCancel={this.props.handleCancelPersonalModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelPersonalModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.personalModalLoading} 
                    onClick={this.props.handleOkPersonalModal}>
                Submit
                </Button>,
                ]}
            >
                <Form className="register-form" 
                onSubmit={() => {this.props.handlePersonalSubmit()}}>
                    <FormItem>
                        <Input
                            size="large"
                            name="email"
                            autoComplete="off"
                            placeholder="Correo Electrónico"
                            value={this.props.informacion_personal.email}
                            onChange={(event) => this.props.handlePersonalInputChange(event)}
                        ></Input>
                    </FormItem>
                    <FormItem>
                        <Input
                            size="large"
                            name="telefono"
                            autoComplete="off"
                            placeholder="Telefono"
                            value={this.props.informacion_personal.telefono}
                            onChange={(event) => this.props.handlePersonalInputChange(event)}
                        ></Input>
                    </FormItem>
                    <FormItem>
                        <Input
                            size="large"
                            name="tipo_de_sangre"
                            autoComplete="off"
                            placeholder="Tipo de sangre"
                            value={this.props.informacion_personal.tipo_de_sangre}
                            onChange={(event) => this.props.handlePersonalInputChange(event)}
                        ></Input>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={6}>
                                <Checkbox 
                                    onChange={(event) => {this.props.onPersonalCheckboxChecked(event)}}
                                    name="fuma"
                                    value={this.props.informacion_personal.fuma}>Fuma
                                </Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox 
                                    onChange={(event) => {this.props.onPersonalCheckboxChecked(event)}}
                                    name="drogas"
                                    value={this.props.informacion_personal.num_seguro_social}>
                                        Drogas
                                </Checkbox>
                            </Col>
                            <Col span={12}>
                                <Checkbox
                                    onChange={(event) => {this.props.onPersonalCheckboxChecked(event)}}
                                    name="bebidas_alcoholicas"
                                    value={this.props.informacion_personal.bebidas_alcoholicas}>
                                        Bebidas alcohólicas
                                </Checkbox>
                            </Col>
                        </Row>                        
                    </FormItem>
                    <FormItem>
                        <Input
                            size="large"
                            name="num_seguro_social"
                            autoComplete="off"
                            placeholder="Numero de seguro social"
                            value={this.props.informacion_personal.num_seguro_social}
                            onChange={(event) => this.props.handlePersonalInputChange(event)}
                        ></Input>
                    </FormItem>
                    <FormItem>
                        <Input
                            size="large"
                            name="seguro_medico"
                            autoComplete="off"
                            placeholder="Seguro Médico"
                            value={this.props.informacion_personal.seguro_medico}
                            onChange={(event) => this.props.handlePersonalInputChange(event)}
                        ></Input>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={12}>
                                <Checkbox 
                                    onChange={(event) => {this.props.onPersonalCheckboxChecked(event)}}
                                    name="internado_hospitalario"
                                    value={this.props.informacion_personal.internado_hospitalario}>
                                        <div className="question-checkbox">
                                            ¿Alguna vez has estado internado?
                                        </div>
                                </Checkbox>
                            </Col>
                            <Col span={12}>
                                <Checkbox 
                                    onChange={(event) => {this.props.onPersonalCheckboxChecked(event)}}
                                    name="cirugia"
                                    value={this.props.informacion_personal.cirugia}>
                                        <div className="question-checkbox">
                                            ¿Hás tenido alguna cirugía?
                                        </div>
                                </Checkbox>
                            </Col>
                        </Row>  
                        <Row>
                            <Col span={12}>
                                <Checkbox 
                                    onChange={(event) => {this.props.onPersonalCheckboxChecked(event)}}
                                    name="actividad_fisica"
                                    value={this.props.informacion_personal.actividad_fisica}>
                                        <div className="question-checkbox">
                                            ¿Realiza actividad física?
                                        </div>
                                </Checkbox>
                            </Col>
                            <Col span={12}>
                                <Checkbox 
                                    onChange={(event) => {this.props.onPersonalCheckboxChecked(event)}}
                                    name="antecedentes_enfermedades_importantes"
                                    value={this.props.informacion_personal.antecedentes_enfermedades_importantes}>
                                        <div className="question-checkbox">
                                            ¿Antecedentes de enfermedades importantes?
                                        </div>
                                </Checkbox>
                            </Col>
                        </Row>                         
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
