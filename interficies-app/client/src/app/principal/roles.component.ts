import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { LoginObserver } from '../models/loginObserver.interface';
import { HttpClient } from '@angular/common/http';

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
  intermedio = false;
  experto = false;

  // Sección de retos
  msnRetos = "Cargando...";
  txtReto = "";
  retos = [];

  // Sección de colecciones

  constructor(private userService: UserService, private principal: AppComponent, private router: Router, private http: HttpClient) {
    this.isLogged = this.userService.isUserLogged();
    this.principal.addLoginObserver(this);
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
          this.intermedio = progress["f"] && progress["j"];
          this.experto =  progress["l"] && progress["d"];
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
        console.log(response);
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
}