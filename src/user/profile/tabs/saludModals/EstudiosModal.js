import React, { Component } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import locale from 'antd/lib/date-picker/locale/es_ES'
import { Modal, Button, Input, Card, Icon } from 'antd';
import './FileModal.css';
const { Meta } = Card;

export default class EstudiosModal extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            // lista o arreglo con jsons internos
            estudios: []
        }

        this.imageUpload = this.imageUpload.bind(this);
        this.updateAllRecetasAvailable = this.updateAllRecetasAvailable.bind(this);    
    }

    componentDidMount() {
        this.updateAllRecetasAvailable();
    }

    updateAllRecetasAvailable(){
        // eliminar todas excepto el access token
        if(localStorage.length > 1){
            for ( var i = 0, len = localStorage.length; i < len; ++i ) {
                if(localStorage.key( i ) !== 'accessToken'){
                    
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        }
    }

    imageUpload(e) {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            const name = 'estudio.'+moment().format();
            localStorage[name] = base64;
            let files = this.state.estudios;
            files.push(
                {
                    name: name,
                    data: base64
                });
            this.setState({
                estudios: files
            });
            console.debug("file stored",base64);
        });
    }
    
    render() {

        return (
            <Modal
                className="modal-visible"
                visible={this.props.estudiosModalVisible}
                title="Mis estudios"
                onOk={this.props.handleOkEstudiosModal}
                onCancel={this.props.handleCancelEstudiosModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelEstudiosModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.estudiosModalLoading} 
                    onClick={this.props.handleOkEstudiosModal}>
                Submit
                </Button>,
                ]}
            >
                Estudios médicos
                <Input
                    size="large"
                    name="estudiosFiles"
                    type="file"
                    onChange={(event) => {
                        this.imageUpload(event);
                    }}
                    
                >
                    
                </Input>

                <div className="cards-container">
                    {this.state.estudios.map(file => (
                        ((file.name.split('.')[0] === 'estudio') &&
                        <Card
                            hoverable
                            style={{width: 240}}
                            cover={
                                <img style={{width:240}} alt="estudio file not found" 
                                key={file.name} 
                                src={file.data} />
                            }
                        >
                            <Meta title={file.name}></Meta>
                        </Card>
                        )
                    ))}
                </div>
            </Modal>
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