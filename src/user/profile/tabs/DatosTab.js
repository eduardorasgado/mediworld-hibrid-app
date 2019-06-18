import React, { Component } from 'react'
import { getAllCountries } from '../../../utils/APIUtilities';
import { Button, Icon, Row, Col, Avatar, notification} from 'antd';
import './DatosTab.css';

import BasicDataModal from './modals/BasicDataModal';
import PersonalDataModal from './modals/PersonalDataModal';
import PublicDataModal from './modals/PublicDataModal';

import 'moment/locale/es';



export default class DatosTab extends Component {

    render() {
        return (
            <Row>
                <Col span={10}>
                    <div className="avatar-container">
                        <Avatar size={104} icon="user" />
                    </div>
                </Col>
                <Col span={14}>
                    <div className="basic-container">
                        <br></br>   
                        <Button onClick={() => {this.props.showBasicModal()}} 
                            className="btn-data-show">Información básica <Icon type="right" /></Button>

                        <Button onClick={() => {this.props.showPersonalModal()}}
                        className="btn-data-show">Información personal <Icon type="right" /></Button>
                        
                        <Button onClick={() => {this.props.showPublicModal()}}
                        className="btn-data-show small-btn">Información médica pública <Icon type="right" /></Button>

                        <BasicDataModal
                            currentUser={this.props.currentUser}

                            {...this.props.state}

                            handleOkBasicModal={this.props.handleOkBasicModal}
                            handleCancelBasicModal={this.props.handleCancelBasicModal}
                            handleBasicSubmit={this.props.handleBasicSubmit}
                            handleInputChange={this.props.handleInputChange}
                            handleDateInput={this.props.handleDateInput}
                            handleCountryChange={this.props.handleCountryChange}
                            
                        ></BasicDataModal>

                        <PersonalDataModal
                            currentUser={this.props.currentUser}

                            {...this.props.state}

                            handleOkPersonalModal={this.props.handleOkPersonalModal}
                            handleCancelPersonalModal={this.props.handleCancelPersonalModal}
                            handlePersonalSubmit={this.props.handlePersonalSubmit}
                            handlePersonalInputChange={this.props.handlePersonalInputChange}
                            onPersonalCheckboxChecked={this.props.onPersonalCheckboxChecked}
                        >
                        </PersonalDataModal>

                        <PublicDataModal
                            {...this.props.state}

                            handleOkPublicModal={this.props.handleOkPublicModal}
                            handleCancelPublicModal={this.props.handleCancelPublicModal}
                            handlePublicSubmit={this.props.handlePublicSubmit}
                            handlePublicInputChange={this.props.handlePublicInputChange}
                        >

                        </PublicDataModal>
                    </div>
                </Col>
            </Row>
        )
    }
}
