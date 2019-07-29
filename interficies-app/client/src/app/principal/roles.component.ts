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
  achivement = "Elegiste un rol";
  currentRol = 'cargando';
  currentText = "";

  intermedio = false;
  experto = false;

  constructor(private userService: UserService, private principal: AppComponent, private router: Router, private http: HttpClient) {
    this.isLogged = this.userService.isUserLogged();
    this.principal.addLoginObserver(this);
    this.showRoleProgress();
    this.getCurrentRol();
  }

  notifyLogin(logged: boolean): void {
    this.isLogged = logged;
    this.showRoleProgress();
    this.getCurrentRol();
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

  getCurrentRol() {
    if(this.isLogged){
      var user = this.userService.getUserLoggedIn();
      this.userService.getAvatar(user.username).subscribe(response => {
        console.log(response['mensaje']);
        if(response['mensaje'])
          this.currentRol = 'none';
        else {
          var resp = response['avatar'].split('-');
          this.currentRol = response['avatar'];
          user.currentGender = resp[0];
          this.http.get('assets/static/avatar/' + resp[1] + '.txt', {responseType: 'text'}).subscribe(data => this.currentText = data);
        }
      });
    }
  }

  onContinue( route ) {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      var achivementID = this.userService.getAchivementID(this.achivement);
      if(achivementID) {
        if(!this.userService.checkUserAchivements(user, achivementID)) {
          this.userService.setAchivement(user.username, achivementID).subscribe(response => {
            if(response["status"] == 0) {
              this.userService.localUpdateAchivemets(user, achivementID);
              alert('Logro conseguido: ' + this.achivement);
              this.router.navigate([route]);
            }
            else {
              alert('Problema con la base de datos: No fue posible desbloquear el logro');
              this.router.navigate([route]);
            }
          });
        }
        else
          this.router.navigate([route]);
      }
      else
        this.router.navigate([route]);
    }
    else {
        this.router.navigate([route]);
    }
  }
}