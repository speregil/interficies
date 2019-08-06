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
    
        this.router.navigate(["interprete"]);
    
  }
}