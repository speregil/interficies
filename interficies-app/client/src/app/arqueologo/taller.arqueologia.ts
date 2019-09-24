import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { DownloadService } from '../models/downloads.service';

@Component({
  selector: 'arqueologia-taller',
  templateUrl: './taller.arqueologia.html',
  styleUrls: ['./arqueologo.component.css']
})
export class TallerComponent {
 
  basicAble = true;
  cargando = true;
  msn = "Para comenzar la activdad, presiona ACEPTAR";

  constructor(private userService: UserService, private router: Router, private download: DownloadService) {
    this.msn = "Cargando";
    var user = this.userService.getUserLoggedIn();
    this.userService.getProgressState(user.username, 'tallerAsig').subscribe(response => {
        if(response['flag']){
          this.basicAble = false;
        }
        this.cargando = false;
        this.msn = "Para comenzar la activdad, presiona ACEPTAR";
    });
  }

  onAccept(){
    if(this.basicAble && !this.cargando) {
      var user = this.userService.getUserLoggedIn();
      this.msn = "Espera un momento por favor...";
      this.cargando = true;
      this.userService.addChallenge(user.username, 'taller', "Taller de la obra JAR").subscribe(response => {
        if(response['mensaje'])
          this.msn = response['mensaje'];
        else {
          this.userService.saveProgress(user.username, "tallerAsig").subscribe(response => { 
            this.onDownload();
            
          });
        }
      });
    }
    else{
      this.msn = "Ya aceptaste o completaste este reto";
    }
  }

  onDownload(){
    var url = './assets/static/laboratorio/taller.docx';
    this.msn = "Reto Aceptado"
    this.basicAble = false;
    this.cargando = false;
    this.download.downloadFile(url).subscribe(response => {
      window.location.href = response.url;
		}), error => this.msn = error
  }
}