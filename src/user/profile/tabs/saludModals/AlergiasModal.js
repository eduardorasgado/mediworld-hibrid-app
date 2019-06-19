import React, { Component } from 'react'
import { Modal, Button, Form, Input, Icon, Row, Col } from 'antd';
import './ListModal.css';
const FormItem = Form.Item;

export default class AlergiasModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alergia: ''
        }

        this.onAlergiaInputChange = this.onAlergiaInputChange.bind(this);
    }

    onAlergiaInputChange(event){
        const value = event.target.value;
        this.setState({
            alergia: value
        });
    }

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
                <div>
                    <Form>
                        <FormItem>
                            <Row>
                                <Col span={20}>
                                    <Input
                                        id="alergia"
                                        nombre='alergias'
                                        value={this.state.alergia}
                                        onChange={(event) => this.onAlergiaInputChange(event)}
                                        autoComplete="off"
                                        placeholder="Agregar alergia"
                                        
                                    ></Input>    
                                </Col>
                                <Col span={4}>
                                    <Icon
                                        className="dyn-button"
                                        type="plus-circle"
                                        theme="twoTone"
                                        onClick={() => {
                                            const event = document.getElementById('alergia');
                                            this.props.handleAlergiaInput(event);
                                            this.setState({
                                                alergia: ''
                                            });
                                        }}
                                    />
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}
