import { Component, OnInit, OnDestroy } from '@angular/core';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})

/**
 * Componente para manejar la ventana de la portada principal
 */
export class PortadaComponent implements OnInit, OnDestroy {
  
    //-------------------------------------------------------------------------
    // Campos y Atributos
    //-------------------------------------------------------------------------

    bgSound = new Howl({
        src: ['/assets/static//snd_portada.mp3'],       // Atributo para manejar la musica de fondo
        loop: true
    });

    //-------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------

    constructor() {}

    ngOnInit() {
      this.bgSound.play();
      this.bgSound.loop();
      Howler.volume(0.5);
    }

    ngOnDestroy() { 
      this.bgSound.stop();
    }
}