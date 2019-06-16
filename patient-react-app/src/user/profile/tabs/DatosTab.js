import React, { Component } from 'react'
import { getAllCountries } from '../../../utils/APIUtilities';
import { Button, Icon, Row, Col, Avatar} from 'antd';
import './DatosTab.css';

import BasicDataModal from './modals/BasicDataModal';

import 'moment/locale/es';



export default class DatosTab extends Component {
    constructor(props){
        super(props);

        this.state = {
            informacion_basica: {
                nombre: this.props.currentUser.nombre,
                apellidos: this.props.currentUser.apellidos,
                estatura: '',
                peso: '',
                genero: this.props.currentUser.genero,
                fechaNacimiento: this.props.currentUser.fechaNacimiento,
                paisNacimiento: this.props.currentUser.paisNacimiento
            },
            informacion_personal: {},
            informacion_medica_publica: {},
            // visibilidad de los modales
            basicModalVisible: false,
            // loading de los modales
            basicModalLoading: false,
            availableCountries: []
            
        }
        this.showBasicModal = this.showBasicModal.bind(this);
        this.handleOkBasicModal = this.handleOkBasicModal.bind(this);
        this.handleCancelBasicModal = this.handleCancelBasicModal.bind(this);
        this.getAvailalableCountries = this.getAvailalableCountries.bind(this);
        this.handleBasicSubmit = this.handleBasicSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleDateInput = this.handleDateInput.bind(this);
    }

    componentDidMount(){
        this.getAvailalableCountries();
    }
    /**
     * Funcion que manda a llamar la api de pacientes y medicos para obtener paises disponibles
     */
    getAvailalableCountries() {
        getAllCountries()
        .then(response => {
            const countries = [...response].map(country => {
                return country.name;
            });
            this.setState({
                availableCountries: countries
            })
        })

    }

    showBasicModal() {
        this.setState({
            basicModalVisible: true
        });
    }

    handleOkBasicModal() {
        this.setState({
            basicModalLoading: true
        });
        setTimeout(() => {
            console.log("OK")
            this.setState({
                basicModalLoading:false,
                basicModalVisible: false
            });
        }, 1000);
    }

    handleCancelBasicModal() {
        this.setState({
            basicModalVisible:false
        });
    }

    handleInputChange(event) {
        const target = event.target;
        let inputName = target.name;
        const inputValue = target.value;
        
        let informacionBasica = this.state.informacion_basica;
        informacionBasica[inputName] = inputValue;
        this.setState({
            informacion_basica: informacionBasica
        });

        console.log(this.state.informacion_basica.nombre);
    }

    handleCountryChange(value) {
        if(value !== null && value !== ''){
            let informacionBasica = this.state.informacion_basica;
            informacionBasica.paisNacimiento = value;
            this.setState({
                informacion_basica: informacionBasica
            });
        }
        console.log(this.state.informacion_basica.paisNacimiento);
    }

    handleBasicSubmit() {
        console.log("s");
    }

    handleDateInput(date, format) {
        let dateVal = ''
        if(date) {
                dateVal = date.format();
        }
        let informacionBasica = this.state.informacion_basica;
        informacionBasica.fechaNacimiento = dateVal;
        this.setState({
            informacion_basica: informacionBasica
        });
        console.log(this.state.informacion_basica.fechaNacimiento)
    }

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
                        <Button onClick={() => {this.showBasicModal()}} 
                            className="btn-data-show">Información básica <Icon type="right" /></Button>

                        <Button className="btn-data-show">Información personal <Icon type="right" /></Button>
                        
                        <Button className="btn-data-show small-btn">Información médica pública <Icon type="right" /></Button>

                        <BasicDataModal
                            currentUser={this.props.currentUser}

                            {...this.state}

                            handleOkBasicModal={this.handleOkBasicModal}
                            handleCancelBasicModal={this.handleCancelBasicModal}
                            handleBasicSubmit={this.handleBasicSubmit}
                            handleInputChange={this.handleInputChange}
                            handleDateInput={this.handleDateInput}
                            handleCountryChange={this.handleCountryChange}
                            
                        ></BasicDataModal>                    
                    </div>
                </Col>
            </Row>
        )
    }
}
