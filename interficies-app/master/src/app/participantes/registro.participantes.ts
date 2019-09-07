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
    confirm = "";
    shownName = "";
    msn = "";

    @Output() emitter = new EventEmitter<string>();

    constructor(private service: UserService){}

    register(){
        this.msn = "";
        if(this.password == this.confirm){
            this.service.registerParticipant(this.username, this.password, this.shownName).subscribe(data => {
                if(data['status'] > 0 )
                    this.msn = data['mensaje'];
                else
                    this.msn = "Registro Exitoso";

                this.clean();
                this.emitter.emit("registro");
            });
        }
        else
            this.msn = 'Las claves no coinciden';
    }

    clean() {
        this.username = "";
        this.password = "";
        this.shownName = "";
    }
} 