import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { LoginObserver } from '../models/loginObserver.interface';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements LoginObserver {

  isLogged : boolean;
  achivement = "Elegiste un rol";

  constructor(private userService: UserService, private principal: AppComponent, private router: Router) {
    this.isLogged = this.userService.isUserLogged();
    this.principal.addLoginObserver(this);
  }

  notifyLogin(logged: boolean): void {
    this.isLogged = logged;
  }

  onContinue( route ) {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      var achivementID = this.userService.getAchivementID(this.achivement);
      if(achivementID) {
        if(!this.userService.checkUserAchivements(user, achivementID)) {
          this.userService.setAchivement(user.username, achivementID).subscribe(response => {
            if(response["status"] == 0) {
              this.userService.localUpdateAchivemets(user, achivementID);
              alert('Logro conseguido: ' + this.achivement);
              this.router.navigate([route]);
            }
            else {
              alert('Problema con la base de datos: No fue posible desbloquear el logro');
              this.router.navigate([route]);
            }
          });
        }
        else
          this.router.navigate([route]);
      }
      else
        this.router.navigate([route]);
    }
    else {
        this.router.navigate([route]);
    }
  }
}