import React, { Component } from 'react';
import { Modal, Form, Button, Row, Col, Tag, Input, Icon } from 'antd';
import '../DatosTab.css';
import './ListModal.css';
const FormItem = Form.Item;


export default class AntecedentesModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            antecedente: {
                // familiar
                familiar: '',
                //patologia
                patologia: ''
            }
        }

        this.onAntecedenteInputChange = this.onAntecedenteInputChange.bind(this);
    }

    onAntecedenteInputChange(event){
        const value = event.target.value;
        const inputName = event.target.name;
        let antecedenteNow = this.state.antecedente;
        antecedenteNow[inputName] = value
        this.setState({
            antecedente: antecedenteNow
        });
    }
    render() {
        return (
            <Modal
                className="modal-visible"
                visible={this.props.antecedentesModalVisible}
                title="Mis Antecedentes"
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
                <div>
                    <Form>
                        <FormItem>
                            <Row>
                                <Col span={20}>
                                    <Input
                                        id="familiar"
                                        name='familiar'
                                        value={this.state.antecedente.familiar}
                                        onChange={(event) => this.onAntecedenteInputChange(event)}
                                        autoComplete="off"
                                        placeholder="Agregar familiar"
                                        
                                    ></Input>  
                                </Col>
                                <Col span={4}>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={20}>
                                    <Input
                                        id="patologia"
                                        name='patologia'
                                        value={this.state.antecedente.patologia}
                                        onChange={(event) => this.onAntecedenteInputChange(event)}
                                        autoComplete="off"
                                        placeholder="Agregar Enfermedad"
                                        
                                    ></Input>    
                                </Col>
                                <Col span={4}>
                                    <Icon
                                        className="dyn-button"
                                        type="plus-circle"
                                        theme="twoTone"
                                        onClick={() => {

                                            if(this.state.antecedente.patologia !== ''){
                                                if(this.state.antecedente.familiar !== ''){
                                                    this.props.handleAntecedenteInput(this.state.antecedente);
                                                    this.setState({
                                                        antecedente: {}
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                </Col>
                            </Row>
                        </FormItem>
                        <div className="tag-hub">
                            {
                                this.props.alergias.map((alergia,key) => (
                                    <Tag key={key} color="blue">{alergia}</Tag>
                                    
                                ))
                            }
                        </div>
                    </Form>
                </div>
            </Modal>
        )
    }
}
