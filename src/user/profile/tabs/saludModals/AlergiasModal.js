import React, { Component } from 'react'
import { Modal, Button } from 'antd';
export default class AlergiasModal extends Component {
    render() {
        return (
            <Modal
                className="modal-visible"
                visible={this.props.alergiasModalVisible}
                title="Alergias"
                onOk={this.props.handleOkAlergiasModal}
                onCancel={this.props.handleCancelAlergiasModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelAlergiasModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.alergiasModalLoading} 
                    onClick={this.props.handleOkAlergiasModal}>
                Submit
                </Button>,
                ]}
            >
                Alergias
            </Modal>
        )
    }
}
