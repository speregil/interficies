import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private currentInitComic;
  private currentLastComic;
  

  constructor() { 
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
}