import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'animacion-intro-interprete',
  templateUrl: './introInterprete.component.html',
  styleUrls: ['./primera.component.css']
})

export class IntroInterpreteComponent {
  
  achivement = 'Viste las animaciones: Interprete';

  constructor(private userService: UserService,  private router: Router, private app: AppComponent) {
    var user = userService.getUserLoggedIn();
    userService.updateRole(user.username, "Interprete").subscribe(response => {
      if(response["status"] == 0) {
        user.currentRol = "Interprete";
        userService.setUserLoggedIn(user);
        app.updateLogin();
      }
    });
  }

  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      var achivementID = this.userService.getAchivementID(this.achivement);
      if(achivementID) {
        if(!this.userService.checkUserAchivements(user, achivementID)) {
          this.userService.setAchivement(user.username, achivementID).subscribe(response => {
            if(response["status"] == 0) {
              this.userService.localUpdateAchivemets(user, achivementID);
              alert('Logro conseguido: ' + this.achivement);
              this.router.navigate(["interprete"]);
            }
            else {
              alert('Problema con la base de datos: No fue posible desbloquear el logro');
              this.router.navigate(["interprete"]);
            }
          });
        }
        else {
          this.router.navigate(["interprete"]);
        }
      }
    }
    else {
        this.router.navigate(["interprete"]);
    }
  }
}