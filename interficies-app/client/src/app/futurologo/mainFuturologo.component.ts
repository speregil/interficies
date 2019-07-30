import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../models/user.service';

@Component({
  selector: 'interacciones',
  templateUrl: './mainFuturologo.component.html',
  styleUrls: ['./mainFuturologo.component.css']
})
export class MainFuturologoComponent {

  retoActual = "";

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}
  
  onOracleClick() {
    this.retoActual = "Procesando...";
    this.http.get('assets/static/oraculo/config.json', {responseType: 'json'}).subscribe(data => {
      var len = parseInt(data["num"]);
      var i = Math.floor(Math.random() * len) + 1;
      this.http.get('assets/static/oraculo/oraculo' + i + '.txt', {responseType: 'text'}).subscribe(txt => this.retoActual = txt);
    });
  }

  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      this.userService.saveProgress(user.username, "f").subscribe(response => {
        if(response["status"] == 0) {
          this.router.navigate(["roles"]);
        }
      });
    }
  }
}