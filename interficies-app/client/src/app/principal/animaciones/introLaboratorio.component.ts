import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'animacion-intro-lab',
  templateUrl: './introLaboratorio.component.html',
  styleUrls: ['./primera.component.css']
})

export class IntroLaboratorioComponent {

  constructor(private userService: UserService,  private router: Router, private app: AppComponent) {
    var user = userService.getUserLoggedIn();
    userService.updateRole(user.username, "Arqueologo").subscribe(response => {
      if(response["status"] == 0) {
        user.currentRol = "Arqueologo";
        userService.setUserLoggedIn(user);
        app.updateLogin();
      }
    });
  }

  onContinue() {
    this.router.navigate(["laboratorio"]);
  }
}