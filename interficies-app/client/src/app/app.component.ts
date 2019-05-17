import { Component } from '@angular/core';
import { RegistroService } from './principal/registro/registro.service';
import { UserService } from './models/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  username = "";
  password = "";
  logged = false;
  loggedUser = null;


  constructor(private registro: RegistroService, private userService: UserService){}

  login(){
    this.registro.login(this.username, this.password).subscribe(data => {
      if(data['status'] > 0 )
        alert(data['mensaje']);
      else{
        var userModel = data["data"];
        var user : User = new User(this.username, userModel["shownName"]);        
        this.userService.setUserLoggedIn(user);
        this.loggedUser = this.userService.getUserLoggedIn();

        this.username = "";
        this.password = "";
      }     
    });
  }

  logout(){
    this.userService.setUserLoggedOut();
    this.loggedUser = null;
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

  updateLogin() {
    this.loggedUser = this.userService.getUserLoggedIn();

    this.username = "";
    this.password = "";
  }
}
