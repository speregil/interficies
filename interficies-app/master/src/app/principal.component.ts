import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent {

    loggedUser = null;

    constructor(private service: UserService){
        this.loggedUser = this.service.getUserLoggedIn();
    }
} 