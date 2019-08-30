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
  selectedGrade = 10;

  msn = 'Selecciona un grupo y un participante para ver sus desafios';
  msn2 = '';
  challengeText = '';
  challengeID = '';
  isSelected = false;
  
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

  onChallengeClick(text, id, points){
    this.challengeText = text;
    this.challengeID = id;
    if(points == 0 ) {
      this.selectedGrade = 10;
      this.msn2 = 'Sin Calificar';
    }
    else{
      this.selectedGrade = points;
      this.msn2 = 'Calificado';
    }
    this.isSelected = true;
  }

  onGrade(){
    this.msn = "Guardando Puntaje";
    this.participants.gradeChallenge(this.challengeID, this.selectedGrade).subscribe(response => {
      if(response['mensaje'])
        this.msn = response['mensaje'];
      else {
        this.msn = 'Notificando...';
        this.participants.addNotification(this.selectedParticipant, "Nuevo logro contenido").subscribe(response => this.msn = '');
      }
    });
  }
}