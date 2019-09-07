import { Component, Input, EventEmitter, Output } from '@angular/core';
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

    @Output() emitter = new EventEmitter<string>();

    constructor(private service: ParticipantsService){}

    unregister(username){
      if(confirm('Desea eliminar este usuario')){
        this.service.unregisterParticipant(username).subscribe(data => {
          if(data["mensaje"])
            alert(data["mensaje"]);
          this.emitter.emit("delete");
        });
      }
    }
} 