import React, { Component } from 'react'
import { Modal, Button } from 'antd';

export default class RecetasModal extends Component {
    render() {
        return (
            <Modal
                className="modal-visible"
                visible={this.props.recetasModalVisible}
                title="Recetas y medicamentos"
                onOk={this.props.handleOkRecetasModal}
                onCancel={this.props.handleCancelRecetasModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelRecetasModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.recetasModalLoading} 
                    onClick={this.props.handleOkRecetasModal}>
                Submit
                </Button>,
                ]}
            >
                Recetas
            </Modal>
        )
    }
}
