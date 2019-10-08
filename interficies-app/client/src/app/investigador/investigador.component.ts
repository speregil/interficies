import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

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

  constructor(private userService: UserService, private router: Router) {}
  
  verify(){
    
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
    }
    else
      this.msn = "Hay respuestas incorrectas";
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

  onContinue() {
    this.router.navigate(["roles"]); 
  }

  onReset() {
    this.selectedAnswers = ["a","a","a","a","a","a","a","a"];
    this.questionState = ["normal","normal","normal","normal","normal","normal","normal","normal"];
  }
}