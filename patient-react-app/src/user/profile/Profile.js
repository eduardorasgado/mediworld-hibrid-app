import React, { Component } from 'react';

/**
 * Clase que representa el perfil principal del actual paciente loggeado
 */
export default class Profile extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            tabs: 5,
            actualTab: 0
        }

        //this.props.loadCurrentUser();
    }

    render() {
        return (
            <div className="profile-container">
                <h3>Bienvenid@ {this.props.currentUser.nombre} a tu perfil </h3>
            </div>
        )
    }
}
