import { ACCESS_TOKEN } from '../constants';

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No existe el token de acceso.");
    }
}