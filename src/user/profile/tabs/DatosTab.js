import React, { Component } from 'react'
import { getAllCountries } from '../../../utils/APIUtilities';
import { Button, Icon, Row, Col, Avatar, notification} from 'antd';
import './DatosTab.css';

import BasicDataModal from './modals/BasicDataModal';
import PersonalDataModal from './modals/PersonalDataModal';
import PublicDataModal from './modals/PublicDataModal';

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
            informacion_personal: {
                email: this.props.currentUser.email,
                telefono: '',
                tipo_de_sangre: '',
                fuma: false,
                drogas: false,
                bebidas_alcoholicas: false,
                num_seguro_social: '',
                seguro_medico: '',
                internado_hospitalario: false,
                cirugia: false,
                actividad_fisica: false,
                antecedentes_enfermedades_importantes: false
            },
            informacion_medica_publica: {
                alergias: false,
                email: false,
                nombre: false,
                pais: false,
                telefono: false,
                tipo_sangre: false
            },
            // visibilidad de los modales
            basicModalVisible: false,
            personalModalVisible:false,
            publicModalVisible: false,
            // loading de los modales
            basicModalLoading: false,
            personalModalLoading:false,
            publicModalLoading: false,
            availableCountries: []
            
        }
        // basic modal
        this.showBasicModal = this.showBasicModal.bind(this);
        this.handleOkBasicModal = this.handleOkBasicModal.bind(this);
        this.handleCancelBasicModal = this.handleCancelBasicModal.bind(this);
        this.handleBasicSubmit = this.handleBasicSubmit.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);

        // personal modal
        this.handleOkPersonalModal = this.handleOkPersonalModal.bind(this);
        this.handleCancelPersonalModal = this.handleCancelPersonalModal.bind(this);
        this.showPersonalModal = this.showPersonalModal.bind(this);
        this.handlePersonalInputChange = this.handlePersonalInputChange.bind(this);
        this.onPersonalCheckboxChecked = this.onPersonalCheckboxChecked.bind(this);
        
        // public modal
        this.handleOkPublicModal = this.handleOkPublicModal.bind(this);
        this.handleCancelPublicModal = this.handleCancelPublicModal.bind(this);
        this.showPublicModal = this.showPublicModal.bind(this);
        this.handlePublicSubmit = this.handlePublicSubmit.bind(this);
        this.handlePublicInputChange = this.handlePublicInputChange.bind(this);

        // otros
        this.getAvailalableCountries = this.getAvailalableCountries.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateInput = this.handleDateInput.bind(this);
        this.filtroNumeroTelefono = this.filtroNumeroTelefono.bind(this);
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

    showPersonalModal() {
        this.setState({
            personalModalVisible: true
        });
    }

    showPublicModal() {
        this.setState({
            publicModalVisible: true
        });
    }

    handleOkBasicModal() {
        this.setState({
            basicModalLoading: true
        });
        setTimeout(() => {
            console.log("OK")
            this.setState({
                basicModalLoading: false,
                basicModalVisible: false
            });
        }, 1000);
        this.handleBasicSubmit();
    }

    handleOkPersonalModal(){
        this.setState({
            personalModalLoading: true
        });
        setTimeout(() => {
            console.log("OK Personal");
            this.setState({
                personalModalLoading: false,
                personalModalVisible: false
            });
        },1000);
        this.handlePersonalSubmit();
    }

    handleOkPublicModal() {
        this.setState({
            publicModalLoading: true
        });
        setTimeout(()=> {
            this.setState({
                publicModalLoading: false,
                publicModalVisible: false
            });
        }, 1000);
        this.handlePublicSubmit()
    }

    handleCancelBasicModal() {
        this.setState({
            basicModalVisible:false
        });
    }

    /**
     * Metodo que se manda a llamar cuando el modal de datos personales es
     * cancelado
     */
    handleCancelPersonalModal(){
        this.setState({
            personalModalVisible: false
        });
    }

    handleCancelPublicModal() {
        this.setState({
            publicModalVisible: false
        });
    }

    /**
     * Metodo generico para los cambios de aquellos campos de tipo input
     */
    handleInputChange(event) {
        const target = event.target;
        let inputName = target.name;
        const inputValue = target.value;
        
        let informacionBasica = this.state.informacion_basica;
        informacionBasica[inputName] = inputValue;
        this.setState({
            informacion_basica: informacionBasica
        });
    }

    handlePersonalInputChange(event) {
        const target = event.target;
        let inputName = target.name;
        const inputValue = target.value;

        let informacionPersonal = this.state.informacion_personal;
        informacionPersonal = this.filtroNumeroTelefono(informacionPersonal, inputName, inputValue)
        this.setState({
            informacion_personal: informacionPersonal
        });
    }

    handlePublicInputChange(checked, event) {

        const target = event.target;
        const inputName = target.name;
        let informacionPublica = this.state.informacion_medica_publica;
        informacionPublica[inputName] = checked;

        this.setState({
            informacion_medica_publica: informacionPublica
        });
        console.log(this.state.informacion_medica_publica)
    }

    filtroNumeroTelefono(informacionPersonal, inputName, inputValue) {
        if(inputName === 'telefono' || inputName == 'num_seguro_social'){
            // detectando si es un numero puro, tambien se eliminan los espacios
            // de este filtro, pero se incluyen en el valor asignado al state
            let numValue = isNaN(inputValue.replace(/\s/g, ''));
            if(!numValue){
                informacionPersonal[inputName] = inputValue;
            }
        } else {
            informacionPersonal[inputName] = inputValue;
        }
        return informacionPersonal;
    }

    onPersonalCheckboxChecked(event){
        const target = event.target;
        const inputName = target.name;
        const checked = target.checked;
        
        let informacionPersonal = this.state.informacion_personal;
        informacionPersonal[inputName] = checked;
        this.setState({
            informacion_personal: informacionPersonal
        });
    }

    /**
     * Metodo para majejar exclusivamente el cambio de los campos
     * de tipo select para el cambio de pais
     */
    handleCountryChange(value) {
        if(value !== null && value !== ''){
            let informacionBasica = this.state.informacion_basica;
            informacionBasica.paisNacimiento = value;
            this.setState({
                informacion_basica: informacionBasica
            });
        }
    }

    /**
     * Metodo para guardar los datos basicos con la api
     */
    handleBasicSubmit() {
        //TODO: Guardar los datos en el servidor
        // esto incluye los datos de la api de perfiles y de los datos
        // sensibles
        console.log("basic submit");
        notification.success({
            message: 'Datos básicos',
            description: 'Tus datos básicos han sido actualizados'
        });
        
    }

    handlePersonalSubmit() {
        console.log("personal submit");
        
        notification.success({
            message: 'Datos Personales',
            description: 'Tus datos personales han sido actualizados'
        });
    }

    handlePublicSubmit() {
        // TODO: Aqui se hace la peticion a la api de datos sensibles
        // para guardar los datos
        console.log("public submit");

        notification.success({
            message:'Datos públicos',
            description: 'Tus datos públicos han sido actualizados'
        });
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

                        <Button onClick={() => {this.showPersonalModal()}}
                        className="btn-data-show">Información personal <Icon type="right" /></Button>
                        
                        <Button onClick={() => {this.showPublicModal()}}
                        className="btn-data-show small-btn">Información médica pública <Icon type="right" /></Button>

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

                        <PersonalDataModal
                            currentUser={this.props.currentUser}

                            {...this.state}

                            handleOkPersonalModal={this.handleOkPersonalModal}
                            handleCancelPersonalModal={this.handleCancelPersonalModal}
                            handlePersonalSubmit={this.handlePersonalSubmit}
                            handlePersonalInputChange={this.handlePersonalInputChange}
                            onPersonalCheckboxChecked={this.onPersonalCheckboxChecked}
                        >
                        </PersonalDataModal>

                        <PublicDataModal
                            {...this.state}

                            handleOkPublicModal={this.handleOkPublicModal}
                            handleCancelPublicModal={this.handleCancelPublicModal}
                            handlePublicSubmit={this.handlePublicSubmit}
                            handlePublicInputChange={this.handlePublicInputChange}
                        >

                        </PublicDataModal>
                    </div>
                </Col>
            </Row>
        )
    }
}
