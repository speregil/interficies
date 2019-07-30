import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class GroupService {

    host = 'localhost:3100';

    constructor ( private http: HttpClient) {}

    addGroup(group, master){
        return this.http.post('http://' + this.host + '/groups/new', {group: group, master: master});
    }

    asign(group, user){
        return this.http.post('http://' + this.host + '/groups/asign', {groupName: group, userName: user});
    }

    listGroups(masterName){
        return this.http.get('http://' + this.host + '/groups/list/' + masterName);
    }

    listParticipants(groupName){
        return this.http.get('http://' + this.host + '/groups/participants/' + groupName);
    }
}