import { Component, ViewChild, ElementRef} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';
import { MusicService } from 'src/app/models/music.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'animacion-intro-investigador',
  templateUrl: './introInvestigador.component.html',
  styleUrls: ['./primera.component.css']
})

/**
 * Componente para manejar el comportamiento de la animación de introducción al reportero
 */
export class IntroInvestigadorComponent {

  //----------------------------------------------------------------------
  // Atributos
  //----------------------------------------------------------------------

  @ViewChild('vid') video: ElementRef;    // Referencia al vide en el documento

  //----------------------------------------------------------------------
  // Constructor
  //----------------------------------------------------------------------

  constructor(private userService: UserService,  private router: Router, music: MusicService, private principal: AppComponent) {
    music.setBg("");
    principal.notifyBgChange();  
    var user = userService.getUserLoggedIn();
    userService.updateRole(user.username, "Reportero").subscribe(response => {
      if(response["status"] == 0) {
        user.currentRol = "Reportero";
        userService.setUserLoggedIn(user);
        principal.updateLogin();
      }
    });
  }

  //----------------------------------------------------------------------
  // Funciones
  //----------------------------------------------------------------------

  /**
   * Navega hacia el componente del reportero
   */
  onContinue() {
    this.router.navigate(["investigador"]);
  }

  /**
   * Reinicia el video
   */
  onAgain() {
    this.video.nativeElement.pause();
    this.video.nativeElement.currentTime = 0;
    this.video.nativeElement.load();
  }
}