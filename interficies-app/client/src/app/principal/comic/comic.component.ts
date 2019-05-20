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
    this.currentComic = "comic-" + this.initComic + ".jpg";
  }
}