import React, { Component } from 'react'
import { Modal, Button, Form, Input } from 'antd';
import '../DatosTab.css';
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
                </Form>
            </Modal>
        )
    }
}
