import { Component, OnInit, OnDestroy } from '@angular/core';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit, OnDestroy {
  
    bgSound = new Howl({
        src: ['/assets/static//snd_portada.mp3']
    });

    constructor() {}
  
    ngOnInit() {
      this.bgSound.play();
      Howler.volume(0.5);
    }

    ngOnDestroy() { 
      this.bgSound.stop();
    }
}