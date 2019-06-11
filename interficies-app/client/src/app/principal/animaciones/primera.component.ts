import { Component} from '@angular/core';
import {Router} from "@angular/router"
import { UserService } from '../../models/user.service';

@Component({
  selector: 'animacion-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.css']
})

export class PrimeraAnimacionComponent {
  
  achivementID = '5cf94d51fdd3290d8cb048dc';

  constructor(private userService: UserService,  private router: Router) {}

  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      if(!this.userService.checkUserAchivements(user, this.achivementID)) {
        this.userService.setAchivement(user.username, this.achivementID).subscribe(response => {
          if(response["status"] == 0) {
            this.userService.localUpdateAchivemets(user, this.achivementID);
            alert('Logro conseguido: Ver la animación 1');
          }
          else
            alert('Problema con la base de datos');
        
          this.setComicViewer();
        });
      }
      else
        this.setComicViewer();
    }
    else
      this.setComicViewer();
  }

  private setComicViewer() {
    this.userService.setInitComic("1");
    this.userService.setLastComic("4");
    this.router.navigate(['comic']);
  }
}