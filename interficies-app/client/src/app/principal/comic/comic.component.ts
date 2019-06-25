import { Component} from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../../models/user.service';

@Component({
  selector: 'comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})

export class ComicComponent{
  
  comicArray: Array<Number>;

  constructor(private userService: UserService, private router: Router) {
    var initComic = this.userService.getInitComic();
    var lastComic = this.userService.getLastComic();
    this.comicArray = this.range(Number.parseInt(initComic), Number.parseInt(lastComic));
  }

  range(start, end): Array<Number> {
    var ans : Array<Number> = new Array();
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

  onContinue() {
    var initComic = this.userService.getInitComic();
    switch (initComic) {
      case '1' : {
        this.setAchivement(1);
        break;
      }
      default : {
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