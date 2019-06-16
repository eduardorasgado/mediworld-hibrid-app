import React, { Component } from 'react';
import './Profile.css';
import { PageHeader, Tag, Statistic, Row, Col } from 'antd';
import { Tabs, Button, Icon } from 'antd';
import DatosTab from './tabs/DatosTab';
import SaludTab from './tabs/SaludTab';
import LineaTiempoTab from './tabs/LineaTiempoTab';
import EmergenciaTab from './tabs/EmergenciaTab';
const { TabPane } = Tabs;



/**
 * Clase que representa el perfil principal del actual paciente loggeado
 */
export default class Profile extends Component {
    constructor(props){
        super(props);

        this.closeSession = this.closeSession.bind(this);
    }

    closeSession(e) {
        this.props.logout();
    }
    render() {
        return (
            <div className="profile-container">
                <Row className="profile-header">
                    <Col span={12}>
                        <h2>
                            Bienvenid@ { this.props.currentUser.nombre } {this.props.currentUser.apellidos}
                        </h2>
                        <p>Tienes nuevas actualizaciones en tu linea de tiempo</p>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Operations action={(event) => this.closeSession(event)}></Operations>
                        </div>
                    </Col>
                </Row>
                <Tabs>
                    <TabPane tab="Mis datos" key="1">
                        <DatosTab currentUser={this.props.currentUser}></DatosTab>
                    </TabPane>
                    <TabPane tab="Mi salud" key="2">
                        <SaludTab currentUser={this.props.currentUser}></SaludTab>
                    </TabPane>
                    <TabPane tab="Linea de tiempo" key="3">
                        <LineaTiempoTab currentUser={this.props.currentUser}></LineaTiempoTab>
                    </TabPane>
                    <TabPane tab="Emergencia" key="4">
                        <EmergenciaTab currentUser={this.props.currentUser}></EmergenciaTab>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const Operations = ({action}) => (
    <Button className="menu-btn" onClick={action}><Icon type="menu" /></Button>
);