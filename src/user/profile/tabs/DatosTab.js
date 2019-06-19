import React, { Component } from 'react'
import { getAllCountries } from '../../../utils/APIUtilities';
import { Button, Icon, Row, Col, Avatar, Input} from 'antd';
import './DatosTab.css';

import BasicDataModal from './modals/BasicDataModal';
import PersonalDataModal from './modals/PersonalDataModal';
import PublicDataModal from './modals/PublicDataModal';

import 'moment/locale/es';



export default class DatosTab extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            avatar: {
                name: '',
                data: ''
            }
        }

        this.loadLastAvatar = this.loadLastAvatar.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
    }

    componentDidMount() {
        this.loadLastAvatar();
    }

    loadLastAvatar() {
        if(localStorage.length > 1){
            for ( var i = 0, len = localStorage.length; i < len; ++i ) {
                if(localStorage.key( i ) === 'profileAvatar'){
                    const localAvatar = localStorage.getItem(localStorage.key( i ));
                    console.log(localAvatar)
                    this.setState({
                        avatar: {
                            name: localStorage.key( i ),
                            data: localAvatar
                        }
                    });
                    console.log(this.state.avatar)
                }
            }
        }
    }

    imageUpload(e) {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            const name = 'profileAvatar';
            localStorage[name] = base64;
            
            this.setState({
                avatar: {
                    name: name,
                    data: base64
                }
            });
            
        });
    }

    render() {
        return (
            <Row>
                <Col span={10}>
                    <div className="avatar-container"
                    >
                        <Avatar 
                            id="avatar-img"
                            size={104} 
                            icon="user"
                            src={this.state.avatar.data}
                        >
                            
                        </Avatar>
                        <Input
                                className="avatarInput"
                                size="small"
                                name="avatarImageInput"
                                type="file"
                                onChange={(event) => {
                                    this.imageUpload(event);
                                }}
                                
                            >
                        </Input>
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


const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
}