import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

@Component({
  selector: 'juglar',
  templateUrl: './juglar.component.html',
  styleUrls: ['./juglar.component.css']
})
export class JuglarComponent {
  
  constructor(private userService: UserService, private router: Router) {}

  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      this.userService.saveProgress(user.username, "j1").subscribe(response => {
        if(response["status"] == 0) {
          this.router.navigate(["roles"]);
        }
      });
    }
  }
}