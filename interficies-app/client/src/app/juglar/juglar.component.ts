import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { ChallengesService } from '../models/challenges.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'juglar',
  templateUrl: './juglar.component.html',
  styleUrls: ['./juglar.component.css']
})
export class JuglarComponent {
  
  masterChallenges = [];

  retoActual = "RETO";
  msnAceptar = "Aceptado";
  basico = true;
  basicAble = true;
  masterAble = true;
  acceptAble = true;

  poolBasico = "selected";
  poolMaster = "juglar-button";



  constructor(private userService: UserService, private router: Router, private http: HttpClient, private challenges: ChallengesService) {}

  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      this.userService.saveProgress(user.username, "j").subscribe(response => {
        if(response["status"] == 0) {
          this.router.navigate(["roles"]);
        }
      });
    }
  }
}