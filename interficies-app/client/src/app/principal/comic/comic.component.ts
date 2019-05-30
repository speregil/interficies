import { Component, Input } from '@angular/core';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})

export class ComicComponent{
  
  comicArray: Array<Number>;

  constructor(private userService: UserService) {
    var initComic = this.userService.getInitComic();
    var lastComic = this.userService.getLastComic();
    this.comicArray = this.range(Number.parseInt(initComic), Number.parseInt(lastComic));
  }

  range(start, end): Array<Number> {
    var ans : Array<Number> = new Array();
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }
}