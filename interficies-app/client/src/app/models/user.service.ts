import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private currentInitComic;
  private currentLastComic;
  private achivementList;
  
  host = 'localhost:3100';

  constructor( private http: HttpClient ) { 
    this.isUserLoggedIn = false;
    this.currentInitComic = 1;
    this.currentLastComic = 1;
    this.getAchivementList().subscribe(response => this.achivementList = response['list']);
  }

  getAchivementList() {
    return this.http.get<{}>('http://' + this.host + '/progress/list');
  }

  getAchivementID(text:string) {
    for(var achivement of this.achivementList) {
      console.log(achivement['text']);
      if(achivement['text'] === text)
        return achivement['_id'];
    }
    return null;
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
    return this.http.get<{}>('http://' + this.host + '/progress/profile/' + user);
  }

  getAchivements(user: string) {
    return this.http.get<{}>('http://' + this.host + '/progress/achivements/' + user);
  }

  setAchivement(pUser: string, achivement: string) {
    return this.http.post<{}>('http://' + this.host + '/progress/achivement', {user : pUser, achivementID : achivement});
  }

  checkUserAchivements(user, id) : boolean {
    var achivements = user.achivements;
    return achivements.includes(id);
  }

  localUpdateAchivemets(user, id) {
    user.achivements.push(id);
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }
}