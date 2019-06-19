import React, { Component } from 'react'
import { Row, Col, Icon, Button, notification } from 'antd';
import './DatosTab.css';
import AntecedentesModal from './saludModals/AntecedentesModal';
import AlergiasModal from './saludModals/AlergiasModal';
import RecetasModal from './saludModals/RecetasModal';
import EstudiosModal from './saludModals/EstudiosModal';

export default class SaludTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            antecedentes: {},
            alergias: {},
            medicamentosModalVisible: false,
            alergiasModalVisible: false,
            antecedentesModalVisible: false,
            estudiosModalVisible: false,
            medicamentosModalLoading: false,
            alergiasModalLoading: false,
            antecedentesModalLoading: false,
            estudiosModalLoading: false
        }

        this.antecedentesShowModal = this.antecedentesShowModal.bind(this);
        this.alergiasShowModal = this.alergiasShowModal.bind(this);
        this.estudiosShowModal = this.estudiosShowModal.bind(this);
        this.recetasShowModal = this.recetasShowModal.bind(this);
        this.handleOkAntecedentesModal = this.handleOkAntecedentesModal.bind(this);
        this.handleOkAlergiasModal = this.handleOkAlergiasModal.bind(this);
        this.handleOkEstudiosModal = this.handleOkEstudiosModal.bind(this);
        this.handleOkRecetasModal = this.handleOkRecetasModal.bind(this);
        this.handleCancelAntecedentesModal = this.handleCancelAntecedentesModal.bind(this);
        this.handleCancelAlergiasModal = this.handleCancelAlergiasModal.bind(this);
        this.handleCancelEstudiosModal = this.handleCancelEstudiosModal.bind(this);
        this.handleCancelRecetasModal = this.handleCancelRecetasModal.bind(this);
        this.handleAntecedentesSubmit = this.handleAntecedentesSubmit.bind(this);
        this.handleAlergiasSubmit = this.handleAlergiasSubmit.bind(this);
        this.handleEstudiosSubmit = this.handleEstudiosSubmit.bind(this);
        this.handleRecetasSubmit = this.handleRecetasSubmit.bind(this);

    }

    antecedentesShowModal() {
        this.setState({
            antecedentesModalVisible: true
        });
    }

    alergiasShowModal(){
        this.setState({
            alergiasModalVisible: true
        });
    }

    estudiosShowModal() {
        this.setState({
            estudiosModalVisible: true
        });
    }

    recetasShowModal() {
        this.setState({
            recetasModalVisible: true
        });
    }

    handleOkAntecedentesModal() {
        this.setState({
            antecedentesModalLoading: true
        });
        setTimeout(()=> {
            this.setState({
                antecedentesModalLoading: false,
                antecedentesModalVisible: false
            });
        }, 1000);
        this.handleAntecedentesSubmit()
    }

    handleOkAlergiasModal() {
        this.setState({
            alergiasModalLoading: true
        });
        setTimeout(()=> {
            this.setState({
                alergiasModalLoading: false,
                alergiasModalVisible: false
            });
        }, 1000);
        this.handleAlergiasSubmit()
    }

    handleOkEstudiosModal() {
        this.setState({
            estudiosModalLoading: true
        });
        setTimeout(()=> {
            this.setState({
                estudiosModalLoading: false,
                estudiosModalVisible: false
            });
        }, 1000);
        this.handleEstudiosSubmit()
    }
    
    handleOkRecetasModal() {
        this.setState({
            recetasModalLoading: true
        });
        setTimeout(()=> {
            this.setState({
                recetasModalLoading: false,
                recetasModalVisible: false
            });
        }, 1000);
        this.handleRecetasSubmit()
    }

    handleCancelAntecedentesModal() {
        this.setState({
            antecedentesModalVisible: false
        });
    }

    handleCancelAlergiasModal() {
        this.setState({
            alergiasModalVisible: false
        });
    }

    handleCancelEstudiosModal() {
        this.setState({
            estudiosModalVisible: false
        });
    }
    
    handleCancelRecetasModal() {
        this.setState({
            recetasModalVisible: false
        });
    }

    handleAntecedentesSubmit() {
        notification.success({
            message: 'Tus antecedentes',
            description: 'La actualización ha sido exitosa'
        });
    }

    handleAlergiasSubmit() {
        notification.success({
            message: 'Tus alergias',
            description: 'La actualización ha sido exitosa'
        });
    }

    handleEstudiosSubmit() {
        notification.success({
            message: 'Tus estudios',
            description: 'La actualización ha sido exitosa'
        });
    }
    
    handleRecetasSubmit() {
        notification.success({
            message: 'Tus recetas',
            description: 'La actualización ha sido exitosa'
        });
    }

    render() {
        return (
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <div className="basic-container" style={{marginTop: 20}}>
                        <Button
                            className="btn-data-show"
                            onClick={() => this.recetasShowModal()}
                        >
                            Mis medicamentos <Icon type="right" />
                        </Button>
                        <Button
                            className="btn-data-show"
                            onClick={() => this.alergiasShowModal()}
                        >
                            Mis alergias <Icon type="right" />
                        </Button>
                        <Button
                            className="btn-data-show"
                            onClick={() => this.antecedentesShowModal()}
                        >
                            Mis antecedentes <Icon type="right" />
                        </Button>
                        <Button
                            className="btn-data-show"
                            onClick={() => this.estudiosShowModal()}
                        >
                            Mis estudios <Icon type="right" />
                        </Button>

                        <AntecedentesModal
                            {...this.state}
                            handleOkAntecedentesModal={this.handleOkAntecedentesModal}
                            handleCancelAntecedentesModal={this.handleCancelAntecedentesModal}

                        >                            
                        </AntecedentesModal>

                        <AlergiasModal
                            {...this.state}
                            handleOkAlergiasModal={this.handleOkAlergiasModal}
                            handleCancelAlergiasModal={this.handleCancelAlergiasModal}
                        >
                        </AlergiasModal>
                        <RecetasModal
                            {...this.state}
                            handleOkRecetasModal={this.handleOkRecetasModal}
                            handleCancelRecetasModal={this.handleCancelRecetasModal}
                        ></RecetasModal>
                        <EstudiosModal
                            {...this.state}
                            handleOkEstudiosModal={this.handleOkEstudiosModal}
                            handleCancelEstudiosModal={this.handleCancelEstudiosModal}
                        ></EstudiosModal>
                    </div>
                </Col>
            </Row>
        )
    }
}
