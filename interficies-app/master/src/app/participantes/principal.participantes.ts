import { Component } from '@angular/core';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'principal-participantes',
  templateUrl: './principal.participantes.html',
  styleUrls: ['./participantes.css']
})

export class PrincipalParticipantesComponent {

    participantes = new Array();
    mensaje = "Cargando la lista";

    constructor(private service: ParticipantsService){
      this.getParticipantes();
    }

    getParticipantes() {
      this.service.getParticipants().subscribe(data => {
        this.participantes = data["list"];
        this.mensaje = data['mensaje'];
      });
    }

    emision(mensaje){
      if(mensaje) {
          this.getParticipantes();
      }
    }
} 