import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';
import { MusicService } from 'src/app/models/music.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'animacion-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.css']
})

/**
 * Componente para manejar el comportamiento de la animación de portada
 */
export class PrimeraAnimacionComponent {

  constructor(private userService: UserService,  private router: Router, music: MusicService, private principal: AppComponent) {
    music.setBg("");
    principal.notifyBgChange();  
  }

  /**
   * Navega hacia el componente del comic, capitulos 1 a 15
   */
  onContinue() {
    this.userService.setInitComic("1");
    this.userService.setLastComic("15");
    this.userService.setComicBg('comic-1')
    this.router.navigate(['comic']);
  }
}