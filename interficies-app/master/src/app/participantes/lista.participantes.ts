import { Component } from '@angular/core';
import { ParticipantsService } from '../services/participants.service';
import { User } from '../services/user.model';

@Component({
  selector: 'lista-participantes',
  templateUrl: './lista.participantes.html',
  styleUrls: ['./participantes.css']
})

export class ListaParticipantesComponent {

    participantes = new Array();
    msn = "";

    constructor(private service: ParticipantsService){
        this.service.getParticipants().subscribe(data => {
            if(data["mensaje"])
                this.msn = data["mensaje"];
                
            this.participantes = data["list"];
        });
    }
} 