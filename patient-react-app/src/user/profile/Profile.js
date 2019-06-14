import React, { Component } from 'react';
import './Profile.css';
import { PageHeader, Tag, Statistic, Row, Col } from 'antd';
import { Tabs, Button } from 'antd';
const { TabPane } = Tabs;


/**
 * Clase que representa el perfil principal del actual paciente loggeado
 */
export default class Profile extends Component {
    constructor(props){
        super(props);

        //this.props.loadCurrentUser();
        
        this.state = {
            tabs: 5,
            actualTab: 0
        }

        //this.props.loadCurrentUser();
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
                            {operations}
                        </div>
                    </Col>
                </Row>
                <Tabs>
                    <TabPane tab="Mis datos" key="1">
                    Content of tab 1
                    </TabPane>
                    <TabPane tab="Mi salud" key="2">
                    Content of tab 2
                    </TabPane>
                    <TabPane tab="Emergencia" key="3">
                    Content of tab 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const operations = <Button>Extra Action</Button>;

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