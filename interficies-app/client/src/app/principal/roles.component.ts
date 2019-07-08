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

  intermedio = false;
  experto = false;

  constructor(private userService: UserService, private principal: AppComponent, private router: Router) {
    this.isLogged = this.userService.isUserLogged();
    this.principal.addLoginObserver(this);
    this.showRoleProgress();
  }

  notifyLogin(logged: boolean): void {
    this.isLogged = logged;
    this.showRoleProgress();
  }

  showRoleProgress() {
    if(this.isLogged) {
      var user = this.userService.getUserLoggedIn();
      this.userService.getProgressProfile(user.username).subscribe(response => {
        if(response["status"] == 0) {
          var progress = response["progOb"];
          this.intermedio = progress["f"] && progress["j"];
          this.experto =  progress["l"] && progress["d"];
        }
      });
    }
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