import React, { Component } from 'react'
import { Modal, Button, Form } from 'antd';
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

                </Form>
            </Modal>
        )
    }
}
