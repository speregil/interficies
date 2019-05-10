import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class RegistroService {
  
    host = 'localhost:3100';

    constructor ( private http: HttpClient) {}

    register(pUser : string, pPassword : string){
        return this.http.post<{}>('http://' + this.host + '/register/', {user : pUser, password : pPassword});
    }
}