import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { AppComponent } from '../../app.component';
import { RegistroService } from './registro.service';
import { UserService } from '../../models/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  username = "";
  password = "";
  shownName = "";
  msn = "";

  constructor(private principal: AppComponent, private service: RegistroService, private userService: UserService, private router: Router){}

  register(){
    this.service.register(this.username, this.password, this.shownName).subscribe(data => {
      if(data['status'] > 0 )
        this.msn = data['mensaje'];
      else{
        var user : User = new User(this.username, this.shownName);  
        this.userService.setUserLoggedIn(user);
        this.principal.updateLogin();
        this.router.navigate(['']);
      }
    });
  }
}