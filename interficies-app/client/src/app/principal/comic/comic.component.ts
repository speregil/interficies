import { Component} from '@angular/core';
import {Router} from "@angular/router";
import {Howl, Howler} from 'howler';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})

export class ComicComponent{
  
  currentComic = "0";
  initComic = "0";
  lastComic = "0";
  bgSounds = new Array();

  constructor(private userService: UserService, private router: Router) {
    this.initComic = this.userService.getInitComic();
    this.lastComic = this.userService.getLastComic();
    this.currentComic = this.initComic;
  }

  initBgSounds(){
    var init = Number(this.initComic);
    var last = Number(this.lastComic);

    while(init <= last) {
      var bgSound = new Howl({
        src: ['/assets/static/comic-soundtrack/comic-' + init + '.wav'],
        loop: true
      });
      this.bgSounds.push(bgSound);
    }
  }

  onSig() {
    var current = Number(this.currentComic);
    var last = Number(this.lastComic);
    current++;
    if(current <= last) {
      this.currentComic = current + "";
    }
  }

  onPrev() {
    var current = Number(this.currentComic);
    var first = Number(this.initComic);
    current--;
    if(current >= first) {
      this.currentComic = current + "";
    }
  }

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

  setAchivement(achivementNum) {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      var achivementText = "Leiste el cómic " + achivementNum;
      var achivementID = this.userService.getAchivementID(achivementText);
      if(achivementID) {
        if(!this.userService.checkUserAchivements(user, achivementID)) {
          this.userService.setAchivement(user.username, achivementID).subscribe(response => {
            if(response["status"] == 0) {
              this.userService.localUpdateAchivemets(user, achivementID);
              alert('Logro conseguido: ' + achivementText);
              this.setRoute(achivementNum);
            }
            else
              alert('Problema con la base de datos: No fue posible desbloquear el logro');
              this.setRoute(achivementNum);
          });
        }
        else {
          this.setRoute(achivementNum);
        }
      }
      else {
        console.log("Por aqui pase");
        this.setRoute(achivementNum);
      }
    }
    else {
      console.log("Por aqui pase");
      this.setRoute(achivementNum);
    }
  }

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
}