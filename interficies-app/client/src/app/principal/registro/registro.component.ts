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

  constructor(private service: RegistroService){}

  register(){
    this.service.register(this.username, this.password).subscribe(data => {
      console.log("Registro exitoso: " + data);
    });
}

}