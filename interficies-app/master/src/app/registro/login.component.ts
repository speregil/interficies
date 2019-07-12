import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { User } from '../services/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent { 
  
  username = "";      // Nombre del usuario que desea ingresar
  password = "";      // Password del usuario que desea ingresar

  constructor(private service: UserService, private router: Router){ }

  login(){
    this.service.login(this.username, this.password).subscribe(data => {
      if(data['status'] > 0 )
        alert(data['mensaje']);
      else{
        var userModel = data["data"];
        var user : User = new User(this.username, userModel["shownName"]);        
        this.service.setUserLoggedIn(user);
        this.username = "";
        this.password = "";
        this.router.navigate(['principal']);
      }     
    });
  }
}