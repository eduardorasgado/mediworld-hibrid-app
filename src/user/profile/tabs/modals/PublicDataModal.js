import React, { Component } from 'react'
import { Modal, Button, Row, Col, Switch, Form } from 'antd';
const FormItem = Form.Item;

export default class PublicDataModal extends Component {
    render() {
        return (
            <Modal
            className="modal-visible"
            visible={this.props.publicModalVisible}
            title="Datos Públicos"
            onOk={this.props.handleOkPublicModal}
            onCancel={this.props.handleCancelPublicModal}
            footer={[
            <Button key="back" onClick={() => {this.props.handleCancelPublicModal()}}>
            Return
            </Button>,
            <Button key="submit" type="primary" 
                loading={this.props.publicModalLoading} 
                onClick={this.props.handleOkPublicModal}>
            Submit
            </Button>,
            ]}
            >
                <Form className="register-form" 
                onSubmit={() => {this.props.handleBasicSubmit()}}>
                    <FormItem>
                        <Row>
                            <Col span={18}>
                                Nombre Completo
                            </Col>
                            <Col span={6}>
                                <Switch 
                                    name="nombre"
                                    checked={this.props.informacion_medica_publica.nombre}
                                    onChange={(checked, event) => {this.props.handlePublicInputChange(checked, event)}} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={18}>
                                Email
                            </Col>
                            <Col span={6}>
                                <Switch
                                    name="email"
                                    checked={this.props.informacion_medica_publica.email}
                                    onChange={(checked, event) => {this.props.handlePublicInputChange(checked, event)}} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={18}>
                                Teléfono
                            </Col>
                            <Col span={6}>
                                <Switch 
                                    name="telefono"
                                    checked={this.props.informacion_medica_publica.telefono}
                                    onChange={(checked, event) => {this.props.handlePublicInputChange(checked, event)}} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={18}>
                                Tipo de sangre
                            </Col>
                            <Col span={6}>
                                <Switch 
                                    name="tipo_sangre"
                                    checked={this.props.informacion_medica_publica.tipo_sangre}
                                    onChange={(checked, event) => {this.props.handlePublicInputChange(checked, event)}} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={18}>
                                País
                            </Col>
                            <Col span={6}>
                                <Switch
                                    name="pais"
                                    checked={this.props.informacion_medica_publica.pais}
                                    onChange={(checked, event) => {this.props.handlePublicInputChange(checked, event)}} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={18}>
                                Alergias
                            </Col>
                            <Col span={6}>
                                <Switch
                                    name="alergias"
                                    checked={this.props.informacion_medica_publica.alergias}
                                    onChange={(checked, event) => {this.props.handlePublicInputChange(checked, event)}} />
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
