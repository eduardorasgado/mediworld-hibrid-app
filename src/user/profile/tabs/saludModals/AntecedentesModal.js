import React, { Component } from 'react';
import { Modal, Form, Button, Row, Col, Switch } from 'antd';
import '../DatosTab.css';
const FormItem = Form.Item;


export default class AntecedentesModal extends Component {
    render() {
        return (
            <Modal
                className="modal-visible"
                visible={this.props.antecedentesModalVisible}
                title="Datos Personales"
                onOk={this.props.handleOkAntecedentesModal}
                onCancel={this.props.handleCancelAntecedentesModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelAntecedentesModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.antecedentesModalLoading} 
                    onClick={this.props.handleOkAntecedentesModal}>
                Submit
                </Button>,
                ]}
            >
                Antecedentes
            </Modal>
        )
    }
}
