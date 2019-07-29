import { Component } from '@angular/core';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./registro.component.css']
})
export class AjustesComponent {

    constructor(private userService: UserService){
        var user = this.userService.getUserLoggedIn();
        this.msn2 = 'Cargando datos...';
        this.userService.getAvatar(user.username).subscribe(response => {
            if(response["avatar"]) {
                this.msn2 = '';
                var seg = response["avatar"].split('-');
                user.currentGender = seg[0];
                if(seg[0] == 'chico')
                    this.changeAvatar('boy');
                else if(seg[0] == 'chica')
                    this.changeAvatar('girl');
            }
            else {
                this.msn2 = 'No se ha seleccionado un avatar';
            }
        });
    }

    password = "";
    confirmacion = "";
    girlSelected = "";
    boySelected = "";
    msn = "";
    msn2 = "";

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
        this.msn2 = "cambiando...";
        var user = this.userService.getUserLoggedIn();
        if(option == 'girl'){
            this.userService.updateAvatar(user.username, 'chica-basico').subscribe(response => {
                this.msn2 = "";
                if(response["mensaje"])
                    this.msn2 = response["mensaje"];
                else {
                    this.changeAvatar(option);
                    user.currentGender = 'chica';
                }
            });
        }
        else {
            this.userService.updateAvatar(user.username, 'chico-basico').subscribe(response => {
                this.msn2 = "";
                if(response["mensaje"])
                    this.msn2 = response["mensaje"];
                else {
                    this.changeAvatar(option);
                    user.currentGender = 'chico';
                }
            });
        }
    }

    private changeAvatar(option){
        if(option == 'girl'){
            this.girlSelected = "selected";
            this.boySelected = "";
        }
        else {
            this.girlSelected = "";
            this.boySelected = "selected";
        }
    }
}