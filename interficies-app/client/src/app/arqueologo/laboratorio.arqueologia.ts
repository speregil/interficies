import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

@Component({
  selector: 'arqueologia-lab',
  templateUrl: './laboratorio.arqueologia.html',
  styleUrls: ['./arqueologo.component.css']
})
export class LaboratorioComponent {
 
  currentCursor = 'lab-container';
  currentColors = [];

  constructor(private userService: UserService, private router: Router) {
    for(var i = 0; i < 8; i++){
      this.currentColors.push('img-container');
    }
  }

  onResaltador( color ) {
    console.log(color);
    this.currentCursor = 'lab-' + color + 'container';
  }

  onImageClick(pos){
    var color = this.currentCursor.split('-');
    this.currentColors[pos] = 'img-' + color[1];
  }

  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      this.userService.saveProgress(user.username, "l").subscribe(response => {
        if(response["status"] == 0) {
          this.router.navigate(["roles"]);
        }
      });
    }
  }
}