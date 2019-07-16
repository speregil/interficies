import { Component, Input } from '@angular/core';
import { ParticipantsService } from '../services/participants.service';
import { User } from '../services/user.model';

@Component({
  selector: 'lista-participantes',
  templateUrl: './lista.participantes.html',
  styleUrls: ['./participantes.css']
})

export class ListaParticipantesComponent {

    @Input() participantes : Array<User>;
    @Input() msn: String;

    constructor(private service: ParticipantsService){}
} 