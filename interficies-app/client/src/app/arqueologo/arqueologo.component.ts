import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'arqueologia',
  templateUrl: './arqueologo.component.html',
  styleUrls: ['./arqueologo.component.css']
})
export class ArqueologoComponent {
 
  constructor(private userService: UserService, private router: Router, private app: AppComponent) {
    var user = userService.getUserLoggedIn();
    userService.updateRole(user.username, "Arqueólogo").subscribe(response => {
      if(response["status"] == 0) {
        user.currentRol = "Arqueólogo";
        userService.setUserLoggedIn(user);
        app.updateLogin();
      }
    });
  }

  onContinue() {}
}