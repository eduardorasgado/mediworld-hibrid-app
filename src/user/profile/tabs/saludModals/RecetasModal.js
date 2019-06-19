import React, { Component } from 'react'
import moment from 'moment';
import { Modal, Button, Input, Card, Icon } from 'antd';
import './FileModal.css';
const { Meta } = Card;

export default class RecetasModal extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            // lista o arreglo con jsons internos
            recetas: []
        }

        this.imageUpload = this.imageUpload.bind(this);
    }

    imageUpload(e) {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            const name = 'receta.'+moment().format();
            localStorage[name] = base64;
            let files = this.state.recetas;
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
                visible={this.props.recetasModalVisible}
                title="Recetas y medicamentos"
                onOk={this.props.handleOkRecetasModal}
                onCancel={this.props.handleCancelRecetasModal}
                footer={[
                <Button key="back" onClick={() => {this.props.handleCancelRecetasModal()}}>
                Return
                </Button>,
                <Button key="submit" type="primary" 
                    loading={this.props.recetasModalLoading} 
                    onClick={this.props.handleOkRecetasModal}>
                Submit
                </Button>,
                ]}
            >
                Recetas médicas
                <Input
                    size="large"
                    name="recetasFiles"
                    type="file"
                    onChange={(event) => {
                        this.imageUpload(event);
                    }}
                    
                >
                    
                </Input>

                <div className="cards-container">
                    {this.state.recetas.map(file => (
                        ((file.name.split('.')[0] === 'receta') &&
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