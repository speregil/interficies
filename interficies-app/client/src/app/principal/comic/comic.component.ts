import { Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Howl, Howler} from 'howler';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})

/**
 * Componente que maneja el visor configurable del comic
 */
export class ComicComponent implements OnDestroy {
  
  currentComic = "0";             // Indice que identifica la pagina que se esta mostrando
  initComic = "0";                // Indice que identifica la primera pagina de la secuencia
  lastComic = "0";                // Indice que identifica la ultima pagina de la secuencia
  bgSounds = new Array<Howl>();   // Arreglo de todos los sonidos asociados a la secuencia actual de paginas

  constructor(private userService: UserService, private router: Router){
    this.initComic = this.userService.getInitComic();
    this.lastComic = this.userService.getLastComic();
    this.currentComic = this.initComic;
    this.initBgSounds();
    this.playSound();
  }

  /**
   * Inicializa el arreglo de sonidos basandose en las paginas inicial y final de la secuencia actual
   */
  initBgSounds(){
    var init = Number(this.initComic);
    var last = Number(this.lastComic);

    while(init <= last) {
      var bgSound = new Howl({
        src: ['/assets/static/comic-soundtrack/comic-' + init + '.wav'], // Los sonidos deben ser .wav y seguir el formato especifico
        loop: true
      });
      this.bgSounds.push(bgSound);
      init++;
    }
  }

  /**
   * Enciende el sonido asociado con la pagina actual y apaga todos los demas
   */
  playSound() {
    this.stopSounds();
    var current = Number(this.currentComic);
    var snd = this.bgSounds[current-1];
    snd.play();
    snd.loop();
    Howler.volume(0.5);
  }

  /**
   * Apaga todos los sonidos en la lista actual
   */
  stopSounds() {
    for(var snd of this.bgSounds)
      snd.stop();
  }

  /**
   * Cambia la pagina actual a la siguiente en la secuencia y enciende el sonido correspondiente
   */
  onSig($element) {
    var current = Number(this.currentComic);
    var last = Number(this.lastComic);
    current++;
    if(current <= last) {
      this.currentComic = current + "";
      this.playSound();
    }
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  /**
   * Cambia la pagina actual a la anterior en la secuencia y enciende el sonido correspondiente
   */
  onPrev() {
    var current = Number(this.currentComic);
    var first = Number(this.initComic);
    current--;
    if(current >= first) {
      this.currentComic = current + "";
      this.playSound();
    }
  }

  /**
   * Controla la navegacion del componente del comic a cualquier otro basandose en la pagina inicial reportada
   */
  onContinue() {
    var initComic = this.userService.getInitComic();
    switch (initComic) {
      case '1' : {
        this.setAchivement(1);
        break;
      }
      default : {
        this.setRoute(1);
        break;
      }
    }
  }

  /**
   * Asigna el logro correspondiente basandose en el numero que recibe por parametro
   * @param achivementNum Version del logro que se va aasignar
   */
  setAchivement(achivementNum) {
    
      this.setRoute(achivementNum);
    
  }

  /**
   * Navega a la siguiente pagina dependiendo del numero de la pagina inicial reportada
   * @param routeNum Primera pagina reportada
   */
  setRoute(routeNum) {
    var routeName = "";
    switch (routeNum) {
      case 1 : {
        routeName = "roles";
        break;
      }
    }
    this.router.navigate([routeName]);
  }
  
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  /**
   * Detiene todos los sonidos antes de destruir el componente
   */
  ngOnDestroy() { 
    this.stopSounds();
  }
}