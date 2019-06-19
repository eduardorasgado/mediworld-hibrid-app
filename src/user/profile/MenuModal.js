import React, { Component } from 'react';
import { Modal, Form, Button, Row, Col, Switch } from 'antd';
import './tabs/DatosTab.css';
const FormItem = Form.Item;


export default class MenuModal extends Component {
    render() {
        return (
            <Modal
                className="modal-visible"
                visible={this.props.menuModalVisible}
                title="Datos básicos"
                onCancel={this.props.handleCancelMenuModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelMenuModal()}}>
                    Regresar
                </Button>,
                ]}
            >
                <Form>
                    <FormItem>
                        <Row>
                            <Col span={8}>
                                <span className="menu-tag">Usuario:</span>
                            </Col>
                            <Col span={16}>
                                {this.props.currentUser.username}
                            </Col>
                        </Row>
                    </FormItem>
                    <hr style={{color: 'white'}}></hr>
                    <FormItem>
                        <Row>
                            <Col span={8}>
                                <span className="menu-tag">Email:</span>
                            </Col>
                            <Col span={16}>
                                {this.props.currentUser.email}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={18}>
                                Sincronizar Fitbit
                            </Col>
                            <Col span={6}>
                                <Switch 
                                    name="fitbit_sync"
                                    
                                    />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span={7}>
                            </Col>
                            <Col>
                            <Button className="close-session-button"
                                onClick={()=> {this.props.closeSession()}}
                            >
                                Cerrar Sesión
                            </Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
