/**
 * UTILIDADES RESPECTO A LAS PETICIONES O PREVIO/ DESPUES DE LA INTERACCION CON
 * LA API DE LOS USUARIOS/PACIENTES
 */
import { API_BASE_URL, ACCESS_TOKEN } from './constants';

// funcion para ensamblar el objeto que va a ser enviado por cada peticion a la api
const request = (options) => {
    const headers = new Headers({
        'Content-type': 'application/json',
    });
    let token = localStorage.getItem(ACCESS_TOKEN);
    if(token) {
        // para mandar el token de autorizacion que se recibio tras haber logueado correctamente
        headers.append('Autorization', 'Bearer'+token);
    }

    const defaults = {
        headers
    };

    options = Object.assign({}, options);

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

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No existe el token de acceso.");
    }

    return request({
        url: API_BASE_URL + '/paciente/me',
        method: 'GET' 
    })
}