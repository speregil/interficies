import { Component } from '@angular/core';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./registro.component.css']
})

export class AjustesComponent {

    achivement = { text: "Has seleccionado tu avatar", points: 5 };

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
        if(confirm("¿Desea cambiar su clave?")) {
            if(this.password){
                if(this.confirmacion && (this.confirmacion == this.password)) {
                    this.msn = "Cambiando...";
                    var user = this.userService.getUserLoggedIn();
                    this.userService.changePassword(user.username, this.password).subscribe(response => {
                        if(response["mensaje"])
                            this.msn = response["mensaje"];
                        else {
                            this.msn = "Cambio exitoso";
                            this.password = "";
                            this.confirmacion = "";
                        }
                    });
                }
                else
                    this.msn = "Las claves no coinciden";
            }
            else
                this.msn = "Escribe una nueva clave";
        }
    }

    onClickAvatar(option){
        if(confirm("¿Desea cambiar su avatar?")) {
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
                        this.userService.setUserLoggedIn(user);
                        this.setAchivement(user);
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
                        this.userService.setUserLoggedIn(user);
                        this.setAchivement(user);
                    }
                });
            }
        }
    }

    private setAchivement( user ){
        if(this.userService.checkUserAchivements(user, this.achivement.text)){
            this.userService.setAchivement(user.username, this.achivement.text, this.achivement.points).subscribe(response => {
              if(response['mensaje'])
                alert(response['mensaje']);
              else {
                this.userService.localUpdateAchivemets(user, this.achivement.text, this.achivement.points);
                alert('Logro desbloqueado: ' + this.achivement.text);
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