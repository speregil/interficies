import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {Howl, Howler} from 'howler';
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
  msnAceptar = "";
  cargando = true;
  basico = true;
  basicAble = true;
  masterAble = false;
  acceptAble = false;

  poolBasico = "selected";
  poolMaster = "vidente-button";

  bgSound = null;

  constructor(private userService: UserService, private router: Router, private http: HttpClient, private challenges: ChallengesService) {
    this.msnAceptar = "Cargando";

    this.bgSound = new Howl({
      src: ['/assets/static/oraculo.mp3'],
      loop: true
    });
    Howler.volume(0.5);
    this.bgSound.play();


    var user = this.userService.getUserLoggedIn();
    this.userService.getProgressState(user.username, 'videnteAsig').subscribe(response => {
        if(response['flag']){
          this.basicAble = false;
        }
        else{
          this.challenges.getMasterChallenges('oraculo').subscribe(response => {
            if(response['mensaje'] == null){
              this.masterChallenges = response['list'];
              this.masterAble = true;
            }
          });
        }
        this.cargando = false;
        this.msnAceptar = '';
    });
  }
  
  onOracleClick() {
    if(!this.cargando){
      if(this.userService.isUserLogged() && this.basicAble) {
        this.retoActual = "Procesando...";
        this.acceptAble = false;
        if(this.basico)
          this.getBasicChallenge();
        else
          this.getMasterChallenge();
      }
      else
        this.retoActual = 'Ya tienes un reto asignado o ya lo completaste';
    }
  }

  getBasicChallenge(){
    this.http.get('assets/static/oraculo/config.json', {responseType: 'json'}).subscribe(data => {
      var len = parseInt(data["num"]);
      var i = Math.floor(Math.random() * len) + 1;
      this.http.get('assets/static/oraculo/oraculo' + i + '.txt', {responseType: 'text'}).subscribe(txt => {
        this.retoActual = txt
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
    if(this.basicAble && !this.cargando) {
      var user = this.userService.getUserLoggedIn();
      this.msnAceptar = "Guardando...";
      this.cargando = true;
      this.userService.addChallenge(user.username, 'vidente', this.retoActual).subscribe(response => {
        if(response['mensaje'])
          this.msnAceptar = response['mensaje'];
        else {
          this.userService.saveProgress(user.username, "videnteAsig").subscribe(response => { 
            this.msnAceptar = "Reto Aceptado"
            this.basicAble = false;
            this.masterAble = false;
            this.acceptAble = false;
            this.cargando = false;
          });
        }
      });
    }
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

  ngOnDestroy() { 
    this.bgSound.stop();
  }
}