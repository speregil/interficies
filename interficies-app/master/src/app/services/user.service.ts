import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

/**
 * Servicio para el acceso al API del servidor
 */
@Injectable()
export class UserService {
  
    host = 'localhost:3100';
    private isUserLoggedIn = false;

    constructor ( private http: HttpClient) {}

    register(pUser : string, pPassword : string, pName : String){
        return this.http.post<{}>('http://' + this.host + '/register/', {user : pUser, password : pPassword, shownName : pName, admin: true});
    }

    login(pUser : string, pPassword : string){
        return this.http.post<{}>('http://' + this.host + '/login/', {user : pUser, password : pPassword, admin: true});
    }

    isUserLogged() {
        return this.isUserLoggedIn;
    }

    setUserLoggedIn(user:User) {
        this.isUserLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    setUserLoggedOut() {
        this.isUserLoggedIn = false;
        localStorage.removeItem('currentUser');
    }
    
    getUserLoggedIn() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}