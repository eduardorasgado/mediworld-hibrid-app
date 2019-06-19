import React, { Component } from 'react'
import { Row, Col, Icon, Button } from 'antd';
import './DatosTab.css';

export default class SaludTab extends Component {
    render() {
        return (
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <div className="basic-container" style={{marginTop: 20}}>
                        <Button
                            className="btn-data-show"
                        >
                            Mis medicamentos <Icon type="right" />
                        </Button>
                        <Button
                            className="btn-data-show"
                        >
                            Mis alergias <Icon type="right" />
                        </Button>
                        <Button
                            className="btn-data-show"
                        >
                            Mis antecedentes <Icon type="right" />
                        </Button>
                        <Button
                            className="btn-data-show"
                        >
                            Mis estudios <Icon type="right" />
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}
