import { Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Howl, Howler} from 'howler';
import { UserService } from '../../models/user.service';
import { AppComponent } from '../../app.component';

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
  currentBg = "";
  bgSound = null;

  constructor(private userService: UserService, private router: Router, private app: AppComponent){
    this.initComic = this.userService.getInitComic();
    this.lastComic = this.userService.getLastComic();
    this.currentComic = this.initComic;
    this.currentBg = this.userService.getComicBg();
    this.bgSound = new Howl({
      src: ['/assets/static/comic-soundtrack/' + this.currentBg + '.mp3'],
      loop: true
    });
    Howler.volume(0.5);
    this.bgSound.play();
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
    }
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
      case '17' : {
        this.setAchivement(2);
        break;
      }
      default : {
        this.setRoute();
        break;
      }
    }
  }

  /**
   * Asigna el logro correspondiente basandose en el numero que recibe por parametro
   * @param achivementNum Version del logro que se va aasignar
   */
  setAchivement(achivementNum) {
    var text = '';
    var points = 0;
    var currentUser = this.userService.getUserLoggedIn();
    if(currentUser) {
      if(achivementNum == 1) {
          text = 'Has leído la primera parte del Cómic';
          points = 20;
          this.saveAchivement(currentUser, text, points, 1);
      }
      else if(achivementNum == 2) {
        text = 'Has leído los capitulos centrales del Cómic';
        points = 20;
        this.saveAchivement(currentUser, text, points, 2);
    }
      else {
        this.setRoute();
      }
    }
    else
      this.setRoute();
  }

  saveAchivement(user, text, points){
    if(this.userService.checkUserAchivements(user, text)){
      this.userService.setAchivement(user.username, text, points).subscribe(response => {
        if(response['status'] > 0) {
          alert(response['mensaje']);
          this.setRoute();
        }
        else {
          alert("Logro obtenido: " + text);
          this.userService.localUpdateAchivemets(user, text, points);
          this.userService.checkLevel(user, updated => {
            if(updated){
              alert("Aumentaste de nivel");
              this.app.updateLogin();
            }
          });
          this.setRoute();
        }
      });  
    }
    else
    this.setRoute();
  }

  /**
   * Navega a la siguiente pagina dependiendo del numero de la pagina inicial reportada
   * @param routeNum Primera pagina reportada
   */
  setRoute() {
    this.router.navigate(["roles"]);
  }

  /**
   * Detiene todos los sonidos antes de destruir el componente
   */
  ngOnDestroy() { 
    this.bgSound.stop();
  }
}