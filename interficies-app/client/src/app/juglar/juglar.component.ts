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

  retoActual = "";
  msnAceptar = "";
  basico = true;
  basicAble = true;
  masterAble = false;
  acceptAble = false;

  poolBasico = "selected";
  poolMaster = "juglar-button";



  constructor(private userService: UserService, private router: Router, private http: HttpClient, private challenges: ChallengesService) {
    challenges.getMasterChallenges('juglar').subscribe(response => {
      if(response['mensaje'] == null && response['list'].length > 0){
        this.masterChallenges = response['list'];
        this.masterAble = true;
      }
    });
  }

  onFolderClick( folder ) {
    if(this.userService.isUserLogged()) {
      this.retoActual = "Procesando...";
      this.acceptAble = false;
      if(this.basico)
        this.getBasicChallenge( folder );
      else
        this.getMasterChallenge();
    }
  }

  getBasicChallenge( folder ){
    this.http.get('assets/static/juglar/config.json', {responseType: 'json'}).subscribe(data => {
      var len = parseInt(data["num"]);
      var i = Math.floor(Math.random() * len) + 1;
      this.http.get('assets/static/juglar/' + folder + '/' + folder + i + '.txt', {responseType: 'text'}).subscribe(txt => {
        this.retoActual = txt;
        this.acceptAble = true;
      });
    });
  }

  getMasterChallenge(){
    var i = Math.floor(Math.random() * this.masterChallenges.length);
    var challenge = this.masterChallenges[i];
    this.retoActual = challenge.text;
    this.acceptAble = true;
  }

  onAccept() {
    if(this.basicAble) {
      var user = this.userService.getUserLoggedIn();
      this.userService.addChallenge(user.username, 'juglar', this.retoActual).subscribe(response => {
        if(response['mensaje'])
          this.msnAceptar = response['mensaje'];
        else {
          this.msnAceptar = 'Reto Aceptado';
          this.basicAble = false;
          this.masterAble = false;
        }
      });
    }
  }

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