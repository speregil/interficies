import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'animacion-instro-futurologo',
  templateUrl: './introFuturologo.component.html',
  styleUrls: ['./primera.component.css']
})

export class IntroFuturologoComponent {
  
  achivement = 'Viste las animaciones: Futurólogo';

  constructor(private userService: UserService,  private router: Router, private app: AppComponent) {
    var user = userService.getUserLoggedIn();
    var nAvatar = user.currentGender + '-vidente';
    
    userService.updateAvatar(user.username, nAvatar).subscribe(response => {});

    userService.updateRole(user.username, "Vidente").subscribe(response => {
      if(response["status"] == 0) {
        user.currentRol = "Vidente";
        userService.setUserLoggedIn(user);
        app.updateLogin();
      }
    });
    
  }

  onContinue() {
   
      
        this.router.navigate(["futurologo"]);
    
  }
}