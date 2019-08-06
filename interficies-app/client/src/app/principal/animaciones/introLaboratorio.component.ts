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
  
  achivement = 'Viste las animaciones: Laboratorio';

  constructor(private userService: UserService,  private router: Router, private app: AppComponent) {}

  onContinue() {
    
        this.router.navigate(["laboratorio"]);
  }
}