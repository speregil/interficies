import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './principal.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './registro/login.component';
import { PrincipalParticipantesComponent } from './participantes/principal.participantes';
import { GroupComponent } from './grupos/grupos.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'participantes', component: PrincipalParticipantesComponent },
  { path: 'grupos', component: GroupComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class MasterRoutingModule {}
