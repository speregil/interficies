import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registro/registro.service';
import { UserService } from '../../models/user.service';

@Component({
  selector: 'logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})

export class LogrosComponent implements OnInit {
    
    achivements = [];
    isLogged = false;

    constructor(private registro: RegistroService, private userService: UserService){}

    ngOnInit(): void {
        var loggedUser = this.userService.getUserLoggedIn();
        if(loggedUser) {
            this.isLogged = true;
            this.userService.getAchivements(loggedUser.username).subscribe(response => this.achivements = response["list"]);
        }
    }
    
    calcularPuntos(): number {
        var puntos = 0;
        for(var achivement of this.achivements) {
            puntos += Number.parseInt(achivement["points"]);
        }
        return puntos;
    }
}