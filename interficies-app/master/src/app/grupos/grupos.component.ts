import { Component } from '@angular/core';
import { GroupService } from '../services/groups.service';
import { UserService } from '../services/user.service';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})

export class GroupComponent {

    groupName = "";
    groupList = [];
    participantsList = [];
    unasignedList = [];
    selectedGroup = "";
    selectedParticipant = "";
    msn = "";
    msn2 = "";
    msn3 = "Selecciona un grupo";

    constructor(private service: GroupService, private user: UserService, private participants: ParticipantsService){
        this.getGroups();
        this.getUnasigned();
    }

    createGroup(){
        var master = this.user.getUserLoggedIn();
        this.msn = "";
        this.msn2 = "";
        this.msn3 = "";
        if(this.groupName != ""){
            this.service.addGroup(this.groupName, master.username).subscribe(response => {
                if(response["mensaje"])
                    this.msn = response["mensaje"];
                else
                this.msn = "Registro Exitoso";
                this.msn3 = "Selecciona un grupo";
                this.getGroups();
            });
        }
    }

    getGroups(){
        var master = this.user.getUserLoggedIn();
        this.service.listGroups(master.username).subscribe(response => {
            this.groupList = response["list"]
            if(this.selectedGroup)
                this.getParticipants();
        });
    }

    onSelectChange(){
        this.msn3 = "Cargando Lista de participantes";
        this.getParticipants();
    }

    getParticipants(){
        this.service.listParticipants(this.selectedGroup).subscribe(response => {
            this.participantsList = response["list"]
            this.msn3 = "";
        });
    }

    getUnasigned(){
        this.participants.listUnasigned().subscribe(response =>{
            this.unasignedList = response["list"]
        });
    }

    asign(){
        this.msn2 = "Asignando";
        if(this.selectedGroup && this.selectedParticipant){
            this.service.asign(this.selectedGroup, this.selectedParticipant).subscribe(response =>{
                if(response["mensaje"])
                    this.msn2 = response["mensaje"];
                else{
                    this.msn2 = "";
                    this.onSelectChange();
                    this.getUnasigned();
                }
            });
        }
        else {
            this.msn2 = "Selecciona un grupo y un participante sin asignar";
        }
    }
} 