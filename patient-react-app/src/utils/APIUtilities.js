/**
 * UTILIDADES RESPECTO A LAS PETICIONES O PREVIO/ DESPUES DE LA INTERACCION CON
 * LA API DE LOS USUARIOS/PACIENTES
 */
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

/**
 * funcion para ensamblar el objeto que va a ser enviado por cada peticion a la api
 * @param {*} options 
 */
const request = (options) => {
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
    });
    let token = localStorage.getItem(ACCESS_TOKEN);
    if(token) {
        // para mandar el token de autorizacion que se recibio tras haber logueado correctamente
        headers.append('Authorization', 'Bearer '+token);
    }

    const defaults = {
        headers
    };

    options = Object.assign({}, defaults, options);

    // se realiza la peticion
    return fetch(options.url, options)
    .then(response => response.json()
        .then(json => {
            if(!response.ok){
                return Promise.reject(json);
            }
            return json;
        })
    );
}

/**
 * Metodo para realizar la peticion a la api, con los datos del paciente actualmente logueado
 */
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No existe el token de acceso.");
    }

    return request({
        url: API_BASE_URL + '/paciente/me',
        method: 'GET' 
    })
}

/**
 * Metodo para encapsular los datos de un paciente que se quiere loguear, estos datos
 * son enviados a la api
 * @param {*} loginRequest 
 */
export function loginPatient(loginRequest) {
    return request({
        url: API_BASE_URL + '/auth/login',
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

/**
 * Metodo que encapsula datos de registro de un paciente y realiza la peticion a la api
 */
export function registerPatient(registerRequest) {
    return request({
        url: API_BASE_URL + '/auth/register',
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}