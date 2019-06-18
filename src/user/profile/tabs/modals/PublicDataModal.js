import React, { Component } from 'react'
import { Modal, Button } from 'antd';

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
                this is a shitty modal for public stuff
            </Modal>
        )
    }
}
