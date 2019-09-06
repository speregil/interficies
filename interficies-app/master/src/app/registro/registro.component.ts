import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { User } from '../services/user.model';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  username = "";
  password = "";
  confirm = "";
  shownName = "";
  msn = "";

  constructor(private service: UserService, private router: Router){}

  register(){
    this.msn = "";
    if(this.password == this.confirm) {
      this.service.register(this.username, this.password, this.shownName).subscribe(data => {
        if(data['status'] > 0 )
          this.msn = data['mensaje'];
        else{
          this.service.login(this.username, this.password).subscribe(d => {
            var userModel = d["data"];
            var user : User = new User(this.username, userModel["shownName"]);        
            this.service.setUserLoggedIn(user);
            this.username = "";
            this.password = "";
            this.shownName = "";
            this.router.navigate(['principal']);
          });
        }
      });
    }
    else
      this.msn = "Las claves no coinciden";;
  }
 }