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
 
  currentCursor = 'lab-container';
  currentColors = [];
  currentImages = [];

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {
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
    else
      alert("Correcto");
  }

  reset(){
    for(var i = 0; i < 9; i++){
      this.currentColors[i] = 'img-container';
    }
  }

  onContinue() {
    if(this.userService.isUserLogged()) {
      var user = this.userService.getUserLoggedIn();
      this.userService.saveProgress(user.username, "l").subscribe(response => {
        if(response["status"] == 0) {
          this.router.navigate(["roles"]);
        }
      });
    }
  }
}