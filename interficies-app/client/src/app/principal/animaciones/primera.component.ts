import { Component} from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../../models/user.service';

@Component({
  selector: 'animacion-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.css']
})

export class PrimeraAnimacionComponent {
  
  achivement = 'Viste las animaciones 1';

  constructor(private userService: UserService,  private router: Router) {}

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
            }
            else
              alert('Problema con la base de datos: No fue posible desbloquear el logro');
        
            this.setComicViewer();
          });
        }
        else
          this.setComicViewer();
      }
      else
        this.setComicViewer();
    }
    else {
      alert('Problema con la base de datos: El logro no existe');
      this.setComicViewer();
    }
  }

  private setComicViewer() {
    this.userService.setInitComic("1");
    this.userService.setLastComic("4");
    this.router.navigate(['comic']);
  }
}