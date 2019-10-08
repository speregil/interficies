import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { DownloadService } from '../models/downloads.service';

@Component({
  selector: 'investigador',
  templateUrl: './investigador.component.html',
  styleUrls: ['./investigador.component.css']
})

export class InvestigadorComponent {

   selectedAnswers = ["a","a","a","a","a","a","a","a"];
   correctAnswers = ["c","a","c","a","b","b","c","c"];
   questionState = ["normal","normal","normal","normal","normal","normal","normal","normal"];

   msn = "";

   basicAble = true;
   cargando = true;

  constructor(private userService: UserService, private router: Router, private download: DownloadService) {
    this.msn = "Cargando...";
    var user = this.userService.getUserLoggedIn();
    this.userService.getProgressState(user.username, 'criticoAsig').subscribe(response => {
        if(response['flag']){
          this.basicAble = false;
        }
        this.cargando = false;
        this.msn = "";
    });
  }
  
  verify(){
    if(this.basicAble && !this.cargando){  
      var allCorrect = true;
      for(var i = 0; i < this.selectedAnswers.length; i++){
        if(this.selectedAnswers[i] == this.correctAnswers[i])
          this.questionState[i] = "correct";
        else{
          this.questionState[i] = "incorrect";
          allCorrect = false;
        }
      }

      if(allCorrect){
        this.msn = 'Respuestas Correctas';
        this.setAchivement();
        this.setChallange();
      }
      else
        this.msn = "Hay respuestas incorrectas";
    }
  }

  private setAchivement(){
    var user = this.userService.getUserLoggedIn();
    if(this.userService.checkUserAchivements(user, "Has contestado el cuestionario sobre el cómic")){
      this.userService.setAchivement(user.username, "Has contestado el cuestionario sobre el cómic", 20).subscribe(response => {
        if(response['mensaje'])
          alert(response['mensaje']);
        else {
          this.userService.localUpdateAchivemets(user, "Has contestado el cuestionario sobre el cómic", 20);
          this.userService.checkLevel(user, function(updated){});
          alert("Logro desbloqueado: Has contestado el cuestionario sobre el cómic");  
        }
      });
    }
  }

  setChallange(){
    var user = this.userService.getUserLoggedIn();
    this.userService.addChallenge(user.username, 'critico', "Crónica de la conspiración en Xanadú").subscribe(response => {
      if(response['mensaje'])
        this.msn = response['mensaje'];
      else {
        this.userService.saveProgress(user.username, "criticoAsig").subscribe(response => { 
          this.onDownload();
        });
      }
    });
  }

  onContinue() {
    this.router.navigate(["roles"]); 
  }

  onReset() {
    this.selectedAnswers = ["a","a","a","a","a","a","a","a"];
    this.questionState = ["normal","normal","normal","normal","normal","normal","normal","normal"];
  }

  onDownload(){
    var url = './assets/static/reportero/cronica.docx';
    this.msn = "Reto Aceptado"
    this.basicAble = false;
    this.cargando = false;
    this.download.downloadFile(url).subscribe(response => {
      window.location.href = response.url;
		}), error => this.msn = error
  }
}