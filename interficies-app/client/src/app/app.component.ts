import { Component } from '@angular/core';
import { RegistroService } from './principal/registro/registro.service';
import { UserService } from './models/user.service';
import { User } from './models/user.model';
import { LoginObserver } from './models/loginObserver.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  loginObservers: LoginObserver[];

  username = "";
  password = "";
  loggedUser = null;


  constructor(private registro: RegistroService, private userService: UserService){
    this.loginObservers = new Array();
    if(this.isLogged()) {
      this.updateLogin();
    }
  }

  login(){
    this.registro.login(this.username, this.password).subscribe(data => {
      if(data['status'] > 0 )
        alert(data['mensaje']);
      else{
        var userModel = data["data"];
        this.userService.getProgressProfile(userModel["username"]).subscribe(progress => {
          var progressModel = progress["progOb"];
          var user : User = new User(this.username, userModel["shownName"], progressModel["currentRol"], progressModel["level"], progressModel["points"]);        
          this.userService.setUserLoggedIn(user);
          this.loggedUser = this.userService.getUserLoggedIn();

          this.username = "";
          this.password = "";

          this.notifyLogin(true);
        });
      }     
    });
  }

  externalLogin(user, pass) {
    this.username = user;
    this.password = pass;
    this.login();
  }

  logout(){
    this.userService.setUserLoggedOut();
    this.loggedUser = null;

    this.notifyLogin(false);
  }

  isLogged(){
    return this.userService.isUserLogged();
  }

  getShownName(){
    if(this.loggedUser) {
      return this.loggedUser.shownName;
    }
    else
      return "";
  }

  getCurrentRol(){
    if(this.loggedUser) {
      console.log(this.loggedUser.currentRol);
      return this.loggedUser.currentRol;
    }
    else
      return "";
  }

  getLevel(){
    if(this.loggedUser) {
      return this.loggedUser.level;
    }
    else
      return "";
  }

  getPoints() {
    if(this.loggedUser) {
      return this.loggedUser.points;
    }
    else
      return "";
  }

  updateLogin() {
    this.loggedUser = this.userService.getUserLoggedIn();

    this.username = "";
    this.password = "";
  }

  addLoginObserver (newObserver: LoginObserver) {
    this.loginObservers.push(newObserver);
  }

  private notifyLogin(logged: boolean) {
    for (var observer of this.loginObservers) {
        observer.notifyLogin(logged);
    }
  }
}
