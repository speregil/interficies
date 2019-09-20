import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private currentInitComic;
  private currentLastComic;
  private currentComicBg;
 
  
  host = 'localhost:3100';

  constructor( private http: HttpClient ) { 
    if(localStorage.getItem('currentUser'))
      this.isUserLoggedIn = true;
    else
      this.isUserLoggedIn = false;
    this.currentInitComic = 1;
    this.currentLastComic = 1;
  }

  setUserLoggedIn(user:User) {
    this.isUserLoggedIn = true;
    localStorage.removeItem('currentUser');
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

  setComicBg(bg: string) {
    this.currentComicBg = bg;
  }

  getComicBg() {
    return this.currentComicBg;
  }

  getProgressProfile(user: string) {
    return this.http.get<{}>('http://' + this.host + '/progress/profile/' + user);
  }

  getProgressState(user, flag){
    return this.http.get<{}>('http://' + this.host + '/progress/state/' + user + '/' + flag);
  }

  getAchivements(user: string) {
    return this.http.get<{}>('http://' + this.host + '/progress/achivements/' + user);
  }

  setAchivement(pUser, pText, pPoints) {
    return this.http.post<{}>('http://' + this.host + '/progress/achivement', {user : pUser, text : pText, points: pPoints});
  }

  checkUserAchivements(user, text) : boolean {
    var achivements = user.achivements;
    for( var achivement of achivements) {
      if(achivement.text == text)
        return false;
    }
    return true;
  }

  localUpdateAchivemets(user, pText, pPoints) {
    var achivement = { _id: '', userID: '', text: pText, points : pPoints }
    user.achivements.push(achivement);
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  checkLevel(user, callback) {
    var achivements = user.achivements;
    var puntos = 0;
    for(var achivement of achivements) {
      puntos += Number.parseInt(achivement["points"]);
    }
    if(puntos >= 50 && puntos < 100 ){
      this.updateLevel(user, 'Practicante 1', function(updated){ callback(updated)});
    }
    else if(puntos >= 100 && puntos < 150){
      this.updateLevel(user, 'Practicante 2', function(updated){ callback(updated)});
    }
    else if(puntos >= 150 && puntos < 200){
      this.updateLevel(user, 'Experto', function(updated){ callback(updated)});
    }
    else if (puntos >= 200){
      this.updateLevel(user, 'Magis', function(updated){ callback(updated)});
    }
  }

  updateRole(pUser, pRole) {
    return this.http.post<{}>('http://' + this.host + '/progress/role', {user : pUser, role : pRole});
  }

  updateAvatar(pUser, pAvatar){
    return this.http.post<{}>('http://' + this.host + '/progress/avatar', {username : pUser, avatar : pAvatar});
  }

  updateLevel(user, plevel, callback){
    user.level = plevel;
    this.http.post<{}>('http://' + this.host + '/progress/level', {username : user.username, level : plevel}).subscribe(response =>{
      if(response['mensaje']){
        callback(false);
      }
      else{
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(user));
        callback(true);
      }
    });
  }

  getAvatar(pUser){
    return this.http.get<{}>('http://' + this.host + '/progress/getavatar/' + pUser);
  }

  changePassword(pUser, newPass) {
    return this.http.post<{}>('http://' + this.host + '/changepass', {username : pUser, password : newPass});
  }

  saveProgress(pUser, pFlag) {
    return this.http.post<{}>('http://' + this.host + '/progress/save', {user : pUser, flag : pFlag});
  }

  addChallenge(pUser, pType, pText) {
    return this.http.post<{}>('http://' + this.host + '/challenges/add', {user : pUser, type : pType, text : pText});
  }

  getChallenges(pUser) {
    return this.http.get<{}>('http://' + this.host + '/challenges/list/' + pUser);
  }

  getNotifications(pUser){
    return this.http.get<{}>('http://' + this.host + '/notifications/list/' + pUser);
  }

  whipeNotifications(pUser){
    return this.http.post<{}>('http://' + this.host + '/notifications/whipe', {username : pUser});
  }
}