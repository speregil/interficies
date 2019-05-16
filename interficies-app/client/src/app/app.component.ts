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

  constructor(private registro: RegistroService, private userService: UserService){}

  login(){
    this.registro.login(this.username, this.password).subscribe(data => {
      if(data['status'] > 0 )
        alert(data['mensaje']);
      else{
        this.logged = true;
        var user : User = new User(this.username, this.password);        
        this.userService.setUserLoggedIn(user);
        console.log(this.userService.getUserLoggedIn());
      }     
    });
  }
}
