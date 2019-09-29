import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'arqueologia-lab',
  templateUrl: './laboratorio.arqueologia.html',
  styleUrls: ['./arqueologo.component.css']
})
export class LaboratorioComponent {
 
  basicAble = true;
  cargando = true;
  msn = '';

  currentCursor = 'lab-container';
  currentColors = [];
  currentImages = [];

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {
    this.msn = "Cargando";
    var user = this.userService.getUserLoggedIn();
    this.userService.getProgressState(user.username, 'arqueologo').subscribe(response => {
        if(response['flag']){
          this.basicAble = false;
        }
        this.msn = '';
        this.cargando = false;
    });

    for(var i = 0; i < 9; i++){
      this.currentColors.push('img-container');
    }

    var source1 = this.getRandomImagesFrom('MyC');
    var source2 = this.getRandomImagesFrom('Gabriella');
    var source3 = this.getRandomImagesFrom('Golpe');
    this.populateTable(source1,source2, source3);
  }

  getRandomImagesFrom(source){
    var randNums = [];
    var randImages = [];
    var flag = 0;
    while(flag < 3){
      var i = Math.floor(Math.random() * 15) + 1;
      if(!randNums.includes(i)){
        randNums.push(i);
        flag++;
      }
    }

    for(var num of randNums){
      var imgSource = source + '/' + source + '-' + num;
      randImages.push(imgSource);
    }
    return randImages;
  }

  populateTable(source1, source2, source3){
    while(source1.length > 0 || source2.length > 0 || source3.length > 0){
      var i = Math.floor(Math.random() * 3) + 1;
      if(i == 1 && source1.length > 0)
        this.currentImages.push(source1.pop());
      else if(i == 2 && source2.length > 0)
        this.currentImages.push(source2.pop());
      else if(i == 3 && source3.length > 0)
        this.currentImages.push(source3.pop());
    }
  }

  onResaltador( color ) {
    this.currentCursor = 'lab-' + color + 'container';
  }

  onImageClick(pos){
    var color = this.currentCursor.split('-');
    this.currentColors[pos] = 'img-' + color[1];
  }

  validate(){
    if(this.basicAble && !this.cargando){
      var mistakes = 0;
      var correct = 0;
      for(var i = 0; i < this.currentImages.length; i++){
        var image = this.currentImages[i].split('/');
        var source = image[0];
        var color = this.currentColors[i];

        if(source == 'Gabriella' && color == 'img-Acontainer')
          correct++;
        else if(source == 'MyC' && color == 'img-Rcontainer')
          correct++;
        else if(source == 'Golpe' && color == 'img-Vcontainer')
          correct++;
        else
          mistakes++; 
      }

      if(mistakes > 0)
        alert("Hay " + mistakes + " datos que no coinciden. Vuelva a intentar");
      else{
        alert("Correcto");
        this.msn = "Espera un momento por favor...";
        this.cargando = true;
        this.saveAchivement();
      }
    }
    else{
      alert('Ya completaste este reto previamente');
    }
  }

  saveAchivement(){
    var user = this.userService.getUserLoggedIn();
    this.userService.setAchivement(user.username, 'Has desarrollado la misión del arqueólogo', 10).subscribe(response => {
      if(response['mensaje'])
        this.msn = response['mensaje'];
      else {
        this.userService.saveProgress(user.username, 'arqueologo').subscribe(response => {
          if(response["status"] == 0){
            this.msn = '';
            this.basicAble = false;
            alert('Logro desbloqueado: Has desarrollado la misión del arqueólogo');
            this.userService.localUpdateAchivemets(user, 'Has desarrollado la misión del arqueólogo', 10);
            this.userService.checkLevel(user, function(updated){});
          }
          else{
            this.msn = 'Cuidado, el usuario no se ha actualizado, vuelva a intentar'; 
          }
        }); 
      }
    });
  }

  reset(){
    for(var i = 0; i < 9; i++){
      this.currentColors[i] = 'img-container';
    }
  }

  onContinue() {
    this.router.navigate(["roles"]);    
  }
}