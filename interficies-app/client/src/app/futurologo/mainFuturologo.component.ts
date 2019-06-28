import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

@Component({
  selector: 'interacciones',
  templateUrl: './mainFuturologo.component.html',
  styleUrls: ['./mainFuturologo.component.css']
})
export class MainFuturologoComponent {

  constructor(private userService: UserService, private router: Router) {}
  
  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      this.userService.saveProgress(user.username, "f").subscribe(response => {
        if(response["status"] == 0) {
          this.router.navigate(["roles"]);
        }
      });
    }
  }
}