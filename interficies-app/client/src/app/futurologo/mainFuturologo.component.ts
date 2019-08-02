import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../models/user.service';
import { ChallengesService } from '../models/challenges.service';

@Component({
  selector: 'interacciones',
  templateUrl: './mainFuturologo.component.html',
  styleUrls: ['./mainFuturologo.component.css']
})
export class MainFuturologoComponent {

  masterChallenges = [];

  retoActual = "";
  basico = true;
  masterAble = false;

  poolBasico = "selected";
  poolMaster = "vidente-button";

  constructor(private userService: UserService, private router: Router, private http: HttpClient, private challenges: ChallengesService) {
    challenges.getMasterChallenges('oraculo').subscribe(response => {
      if(response['mensaje'] == null){
        this.masterChallenges = response['list'];
        console.log(this.masterChallenges);
        this.masterAble = true;
      }
    });
  }
  
  onOracleClick() {
    console.log(this.basico)
    if(this.userService.isUserLogged()) {
      this.retoActual = "Procesando...";
      if(this.basico)
        this.getBasicChallenge();
      else
        this.getMasterChallenge();
    }
  }

  getBasicChallenge(){
    var user = this.userService.getUserLoggedIn();
    this.http.get('assets/static/oraculo/config.json', {responseType: 'json'}).subscribe(data => {
      var len = parseInt(data["num"]);
      var i = Math.floor(Math.random() * len) + 1;
      this.http.get('assets/static/oraculo/oraculo' + i + '.txt', {responseType: 'text'}).subscribe(txt => {
        this.retoActual = txt;
        this.userService.addChallenge(user.username, 'oraculo', txt).subscribe(response => {
          if(response['mensaje'])
            alert(response['mensaje']);
          });
        });
    });
  }

  getMasterChallenge(){
    var user = this.userService.getUserLoggedIn();
    var i = Math.floor(Math.random() * this.masterChallenges.length);
    var challenge = this.masterChallenges[i]
    this.retoActual = challenge.text;
    this.userService.addChallenge(user.username, 'oraculo', challenge.text).subscribe(response => {
      if(response['mensaje'])
        alert(response['mensaje']);
    });
  }

  changePool(nPool){
    if(nPool == 'basico'){
      this.poolBasico = "selected";
      this.poolMaster = "vidente-button";
      this.basico = true;
    }
    else {
      this.poolBasico = "vidente-button";
      this.poolMaster = "selected";
      this.basico = false;
    }
  }

  onContinue() {  
    this.router.navigate(["roles"]);
  }
}