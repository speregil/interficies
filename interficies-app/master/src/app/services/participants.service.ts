import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class ParticipantsService {

    host = 'localhost:3100';

    constructor ( private http: HttpClient) {}

    getParticipants() {
        return this.http.get<{}>('http://' + this.host + '/participantes');
    }
}