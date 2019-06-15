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
                <Row>
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
                        <DatosTab ></DatosTab>
                    </TabPane>
                    <TabPane tab="Mi salud" key="2">
                        <SaludTab></SaludTab>
                    </TabPane>
                    <TabPane tab="Linea de tiempo" key="3">
                        <LineaTiempoTab></LineaTiempoTab>
                    </TabPane>
                    <TabPane tab="Emergencia" key="4">
                        <EmergenciaTab></EmergenciaTab>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const Operations = ({action}) => (
    <Button onClick={action}><Icon type="menu" /></Button>
);

const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
        <div className="description">
        <div className="term">{term}</div>
        <div className="detail">{children}</div>
        </div>
    </Col>
);
  
const content = (
<Row>
    <Description term="Created">Lili Qu</Description>
    <Description term="Association">
    <a>421421</a>
    </Description>
    <Description term="Creation Time">2017-01-10</Description>
    <Description term="Effective Time">2017-10-10</Description>
    <Description term="Remarks" span={24}>
    Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Description>
</Row>
);


  
const extraContent = (
<Row>
    <Col span={12}>
    <Statistic title="Status" value="Pending" />
    </Col>
    <Col span={12}>
    <Statistic title="Price" prefix="$" value={568.08} />
    </Col>
</Row>
);