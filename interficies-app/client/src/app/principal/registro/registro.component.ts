import { Component } from '@angular/core';
import { RegistroService } from './registro.service';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  username = "";
  password = "";
  msn = "";

  constructor(private service: RegistroService){}

  register(){
    this.service.register(this.username, this.password).subscribe(data => {
      if(data['status'] > 0 )
        this.msn = data['mensaje'];
      else
        this.msn = data['mensaje'];
    });
}

}