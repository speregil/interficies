import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent {

    loggedUser = null;

    constructor(private service: UserService, private router: Router){
        this.loggedUser = this.service.getUserLoggedIn();
    }

    onExit(){
      this.service.setUserLoggedOut()
      this.router.navigate(['']);
    }
} 