import { Component, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent {
  
    bgSound = new Howl({
        src: ['/assets/static//snd_portada.mp3']
    });

    constructor() {}
  
    ngOnInit() {
      this.bgSound.play();
      Howler.volume(0.5);
    }

}