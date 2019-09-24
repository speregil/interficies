import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { ChallengesService } from '../models/challenges.service';
import { HttpClient } from '@angular/common/http';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'juglar',
  templateUrl: './juglar.component.html',
  styleUrls: ['./juglar.component.css']
})
export class JuglarComponent {
  
  masterChallenges = [];

  perfilActual = "";
  retoActual = "";
  msnAceptar = "";
  cargando = true;
  basico = true;
  basicAble = true;
  masterAble = false;
  acceptAble = false;

  poolBasico = "selected";
  poolMaster = "juglar-button";

  bgSound = new Howl({
    src: ['/assets/static/mosca.mp3'],
    loop: true
});


  constructor(private userService: UserService, private router: Router, private http: HttpClient, private challenges: ChallengesService) {
    
    this.msnAceptar = "Cargando";
    var user = this.userService.getUserLoggedIn();
    this.userService.getProgressState(user.username, 'juglarAsig').subscribe(response => {
        if(response['flag']){
          this.basicAble = false;
        }
        else{
          this.challenges.getMasterChallenges('juglar').subscribe(response => {
            if(response['mensaje'] == null && response['list'].length > 0){
              this.masterChallenges = response['list'];
              this.masterAble = true;
            }
          });
        }
        this.cargando = false;
        this.msnAceptar = '';
    });
  }

  ngOnInit() {
    this.bgSound.play();
    this.bgSound.loop();
    Howler.volume(2);
  }

  ngOnStop(){
    this.bgSound.stop();
  }

  onFolderClick( folder ) {
    if(!this.cargando && this.basicAble) {
      this.retoActual = "Procesando...";
      this.acceptAble = false;
      if(this.basico)
        this.getBasicChallenge( folder );
      else
        this.getMasterChallenge();
    }
    else{
      this.perfilActual = " ";
      this.retoActual = "Ya aceptaste o completaste un reto en esta sección";
    }
  }

  getBasicChallenge( folder ){
    
    this.http.get('assets/static/juglar/' + folder + '/' + folder + '.txt', {responseType: 'text'}).subscribe(perfil => {
        this.perfilActual = perfil;
    });

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
    if(this.basicAble && !this.cargando) {
      this.msnAceptar = "Guardando...";
      var user = this.userService.getUserLoggedIn();
      this.userService.addChallenge(user.username, 'juglar', this.retoActual).subscribe(response => {
        if(response['mensaje'])
          this.msnAceptar = response['mensaje'];
        else {
          this.userService.saveProgress(user.username, "juglarAsig").subscribe(response => { 
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

  onContinue() {
    this.router.navigate(["roles"]);
  }

  ngOnDestroy() { 
    this.bgSound.stop();
  }
}