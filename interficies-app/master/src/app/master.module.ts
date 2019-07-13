import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MasterRoutingModule } from './master-routing.module';

import { UserService } from './services/user.service';
import { ParticipantsService } from './services/participants.service';

import { MasterComponent } from './master.component';
import { PrincipalComponent } from './principal.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './registro/login.component';
import { PrincipalParticipantesComponent } from './participantes/principal.participantes';
import { RegistroParticipantesComponent } from './participantes/registro.participantes';
import { ListaParticipantesComponent } from './participantes/lista.participantes';

@NgModule({
  declarations: [
    MasterComponent,
    PrincipalComponent,
    RegistroComponent,
    LoginComponent,
    PrincipalParticipantesComponent,
    RegistroParticipantesComponent,
    ListaParticipantesComponent 
  ],
  imports: [
    BrowserModule,
    MasterRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    ParticipantsService
  ],
  bootstrap: [ MasterComponent ]
})

export class MasterModule { }
