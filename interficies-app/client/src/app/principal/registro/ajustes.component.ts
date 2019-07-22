import { Component } from '@angular/core';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./registro.component.css']
})
export class AjustesComponent {

    constructor(private userService: UserService){}

    password = "";
    msn = "";

    changePassword(){
        if(this.password){
            var user = this.userService.getUserLoggedIn();
            this.userService.changePassword(user.username, this.password).subscribe(response => {
                if(response["mensaje"])
                    this.msn = response["mensaje"];
                else
                    this.msn = "Cambio exitoso";
            });
        }
        else
            this.msn = "Escribe una nueva clave";
    }
}