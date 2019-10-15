import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';

@Component({
  selector: 'animacion-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.css']
})

/**
 * Componente para manejar el comportamiento de la animación de portada
 */
export class PrimeraAnimacionComponent {

  constructor(private userService: UserService,  private router: Router) {}

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