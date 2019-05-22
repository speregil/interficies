import { Component, OnInit} from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../models/user.service';
import { LoginObserver } from '../models/loginObserver.interface';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements LoginObserver {

  isLogged : boolean;  
  constructor(private userService: UserService, private principal: AppComponent) {
    this.isLogged = this.userService.isUserLogged();
    this.principal.addLoginObserver(this);
  }

  notifyLogin(logged: boolean): void {
    this.isLogged = logged;
  }
}