import { Component, Input } from '@angular/core';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})

export class ComicComponent{
  
  initComic: string;
  lastComic: string;
  currentComic: string;

  constructor(private userService: UserService) {
    this.initComic = this.userService.getInitComic();
    this.lastComic = this.userService.getLastComic();
    this.currentComic =  this.initComic;
  }

  onSig() {
    var current = Number(this.currentComic);
    var last = Number(this.lastComic);
    current++;
    if(current <= last) {
      this.currentComic = current + "";
    }
  }

  onPrev() {
    var current = Number(this.currentComic);
    var first = Number(this.initComic);
    current--;
    if(current >= first) {
      this.currentComic = current + "";
    }
  }
}