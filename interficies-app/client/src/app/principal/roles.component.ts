import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { LoginObserver } from '../models/loginObserver.interface';
import { HttpClient } from '@angular/common/http';
import { DownloadService } from '../models/downloads.service';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements LoginObserver {

  isLogged : boolean;

  // Visor del avatar
  currentRol = 'cargando';
  currentText = "";

  // Sección de navegación
  basico = false;
  intermedio = false;
  experto = false;
  master = false;

  // Seccion de colecciones
  jar = false;
  comic2 = false;
  comic3 = false;
  novela = false;
  final = false;

  // Sección de retos
  msnRetos = "Cargando...";
  txtReto = "";
  retos = [];

  bgSound = null;

  constructor(private userService: UserService, private principal: AppComponent, private router: Router, private http: HttpClient, private download: DownloadService) {
    this.isLogged = this.userService.isUserLogged();
    this.principal.addLoginObserver(this);
    this.bgSound = new Howl({
      src: ['/assets/static/snd_portada.mp3'],
      loop: true
    });
    Howler.volume(0.5);
    this.bgSound.play();
    this.showRoleProgress();
    this.getCurrentRol();
    this.getChallenges();
  
  }

  notifyLogin(logged: boolean): void {
    this.isLogged = logged;
    this.showRoleProgress();
    this.getCurrentRol();
  }

  getCurrentRol() {
    if(this.isLogged){
      var user = this.userService.getUserLoggedIn();
      this.currentRol = user.currentGender + '-' + user.currentRol.toLowerCase();
      this.http.get('assets/static/avatar/' + user.currentRol.toLowerCase() + '.txt', {responseType: 'text'}).subscribe(data => this.currentText = data);
    }
  }

  showRoleProgress() {
    if(this.isLogged) {
      var user = this.userService.getUserLoggedIn();
      this.userService.getProgressProfile(user.username).subscribe(response => {
        if(response["status"] == 0) {
          var progress = response["progOb"];
          this.basico = progress["vidente"] && progress["juglar"];
          this.jar = progress["vidente"] && progress["juglar"];
          this.comic2 = progress["vidente"] && progress["juglar"];
          this.intermedio = progress["taller"];
          this.experto =  progress["arqueologo"];
          this.master =  progress["critico"];
        }
      });
    }
  }

  onContinue( route ) {
    this.router.navigate([route]);
  }

  getChallenges() {
    if(this.isLogged) {
      var user = this.userService.getUserLoggedIn();
      this.userService.getChallenges(user.username).subscribe(response => {
        if(response['mensaje'])
          this.msnRetos = response['mensaje'];
        else {
          this.msnRetos = '';
          this.retos = response['list'];
        }
      });
    }
  }

  onChallenge( text ) {
    this.txtReto = text;
  }

  onComic(chapter){
    switch( chapter ) {
      case 1:
        this.userService.setInitComic("1");
        this.userService.setLastComic("16");
        this.userService.setComicBg('comic-1')
        this.router.navigate(['comic']);
        break;
      case 2:
        this.userService.setInitComic("17");
        this.userService.setLastComic("29");
        this.userService.setComicBg('comic-2')
        this.router.navigate(['comic']);
        break;  
    }
  }

  onDownload(url){
    this.download.downloadFile(url).subscribe(response => {
      window.location.href = response.url;
		}), error => console.log(error);
  }

  ngOnDestroy() { 
    this.bgSound.stop();
  }
}