import React, { Component } from 'react'
import { Modal, Button } from 'antd';

export default class EstudiosModal extends Component {
    render() {
        return (
            <Modal
                className="modal-visible"
                visible={this.props.estudiosModalVisible}
                title="Mis estudios"
                onOk={this.props.handleOkEstudiosModal}
                onCancel={this.props.handleCancelEstudiosModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelEstudiosModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.estudiosModalLoading} 
                    onClick={this.props.handleOkEstudiosModal}>
                Submit
                </Button>,
                ]}
            >
                Estudios médicos
            </Modal>
        )
    }
}
