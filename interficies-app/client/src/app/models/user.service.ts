import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private currentInitComic;
  private currentLastComic;
  
  host = 'localhost:3100';

  constructor( private http: HttpClient ) { 
    this.isUserLoggedIn = false;
    this.currentInitComic = 1;
    this.currentLastComic = 1;
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

  isUserLogged() {
    return this.isUserLoggedIn;
  }

  getInitComic() {
    return this.currentInitComic;
  }

  setInitComic(init: string) {
    this.currentInitComic = init;
  }

  getLastComic() {
    return this.currentLastComic;
  }

  setLastComic(init: string) {
    this.currentLastComic = init;
  }

  getProgressProfile(user: string) {
    return this.http.get<{}>('http://' + this.host + '/progress/' + user);
  }
}