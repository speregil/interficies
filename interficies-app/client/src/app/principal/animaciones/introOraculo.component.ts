import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'animacion-intro-oraculo',
  templateUrl: './introOraculo.component.html',
  styleUrls: ['./primera.component.css']
})

export class IntroOraculoComponent {
  
  achivement = 'Viste las animaciones: Oraculo';

  constructor(private userService: UserService,  private router: Router, private app: AppComponent) {}

  onContinue() {
    
        this.router.navigate(["arqueologo/oraculo"]);
  }
}