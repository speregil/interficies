import { Component } from '@angular/core';
import { GroupService } from '../services/groups.service';
import { UserService } from '../services/user.service';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'expansiones',
  templateUrl: './expansiones.component.html',
  styleUrls: ['./expansiones.component.css']
})

export class ExpansionesComponent {

  groupList = [];
  participantsList = [];
  challengesList = [];

  selectedGroup = "";
  selectedParticipant = "";

  msn = 'Selecciona un grupo y un participante para ver sus desafios';
  challengeText = '';
  
  constructor(private service: GroupService, private user: UserService, private participants: ParticipantsService){
    this.getGroups();
  }

  getGroups(){
    var master = this.user.getUserLoggedIn();
    this.service.listGroups(master.username).subscribe(response => {
      this.groupList = response["list"]
      if(this.selectedGroup)
        this.getParticipants();
    });
  }

  getParticipants(){
    this.service.listParticipants(this.selectedGroup).subscribe(response => {
        this.participantsList = response["list"]
        this.msn = "";
    });
  }

  getChallenges(){
    this.msn = 'Cargando desafios...';
    this.participants.getParticipantChallenges(this.selectedParticipant).subscribe(response => {
      this.msn = '';
      if(response['mensaje'])
        this.msn = 'No hay desafios';
      else
        this.challengesList = response['list'];
    });
  }

  onSelectChange(){
    this.msn = "Cargando Lista de participantes";
    this.getParticipants();
  }

  onParticipantChange(){
    this.msn = "Cargando Lista de desafios";
    this.getChallenges();
  }

  onChallengeClick(text){
    this.challengeText = text;
  }
}