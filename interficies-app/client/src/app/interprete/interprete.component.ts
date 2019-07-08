import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

@Component({
  selector: 'interprete',
  templateUrl: './interprete.component.html',
  styleUrls: ['./interprete.component.css']
})
export class InterpreteComponent {

  constructor(private userService: UserService, private router: Router) {}
  
  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      this.userService.saveProgress(user.username, "i").subscribe(response => {
        if(response["status"] == 0) {
          this.router.navigate(["roles"]);
        }
      });
    }
  }
}