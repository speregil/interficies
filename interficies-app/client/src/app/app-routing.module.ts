import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from './principal/registro.component';
import { RemediacionesComponent } from './remediaciones/remediaciones.component';
import { ArqueologiaComponent } from './arqueologia/arqueologia.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';
import { DebatesExpansiones } from './expansiones/debates/debates.expansiones';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'remediaciones', component: RemediacionesComponent},
  { path: 'arqueologia', component: ArqueologiaComponent},
  { path: 'expansiones', component: ExpansionesComponent },
  { path: 'expansiones/debates', component: DebatesExpansiones, outlet: "exp-outlet"}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }