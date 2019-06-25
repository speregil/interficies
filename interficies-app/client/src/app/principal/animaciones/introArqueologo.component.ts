import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'animacion-intro-arqueologo',
  templateUrl: './introArqueologo.component.html',
  styleUrls: ['./primera.component.css']
})

export class IntroArqueologoComponent {
  
  achivement = 'Viste las animaciones: Arqueólogo';

  constructor(private userService: UserService,  private router: Router, private app: AppComponent) {
    var user = userService.getUserLoggedIn();
    userService.updateRole(user.username, "Arqueólogo").subscribe(response => {
      if(response["status"] == 0) {
        user.currentRol = "Arqueólogo";
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
              this.router.navigate(["arqueologo"]);
            }
            else {
              alert('Problema con la base de datos: No fue posible desbloquear el logro');
              this.router.navigate(["arqueologo"]);
            }
          });
        }
        else {
          this.router.navigate(["arqueologo"]);
        }
      }
    }
    else {
        this.router.navigate(["arqueologo"]);
    }
  }
}