import { Component, EventEmitter, Output} from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'registro-participantes',
  templateUrl: './registro.participantes.html',
  styleUrls: ['./participantes.css']
})

export class RegistroParticipantesComponent {

    username = "";
    password = "";
    shownName = "";
    msn = "";

    @Output() emitter = new EventEmitter<string>();

    constructor(private service: UserService){}

    register(){
        this.msn = "";
        this.service.registerParticipant(this.username, this.password, this.shownName).subscribe(data => {
            if(data['status'] > 0 )
                this.msn = data['mensaje'];
            else
                this.msn = "Registro Exitoso";

            this.clean();
            this.emitter.emit("registro");
        });
    }

    clean() {
        this.username = "";
        this.password = "";
        this.shownName = "";
    }
} 