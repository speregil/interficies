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
    confirmacion = "";
    girlSelected = "";
    boySelected = "";
    msn = "";

    changePassword(){
        if(this.password){
            if(this.confirmacion && (this.confirmacion == this.password)) {
                var user = this.userService.getUserLoggedIn();
                this.userService.changePassword(user.username, this.password).subscribe(response => {
                    if(response["mensaje"])
                        this.msn = response["mensaje"];
                    else
                        this.msn = "Cambio exitoso";
                });
            }
            else
                this.msn = "Las claves no coinciden";
        }
        else
            this.msn = "Escribe una nueva clave";
    }

    onClickAvatar(option){
        var user = this.userService.getUserLoggedIn();
        if(option == 'girl'){
            this.userService.updateAvatar(user.username, 'chica-basico').subscribe(response => {

            });
        }
    }
}