import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PortadaComponent } from './principal/portada.component';
import { RegistroComponent } from './principal/registro/registro.component';
import { RolesComponent } from './principal/roles.component';
import { CreditosComponent } from './principal/creditos/creditos.component';
import { InstruccionesComponent } from './principal/instrucciones/instrucciones.component';
import { ComicComponent } from './principal/comic/comic.component';
import { RemediacionesComponent } from './remediaciones/remediaciones.component';
import { ArqueologiaComponent } from './arqueologia/arqueologia.component';
import { InteraccionesComponent } from './interacciones/interacciones.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';
import { DebatesExpansiones } from './expansiones/debates/debates.expansiones';
import { JuegoExpansiones } from './expansiones/juego/juego.expansiones';
import { NarratonesExpansiones } from './expansiones/narratones/narratones.expansiones';
import { AppComponent } from './app.component';

import { PrimeraAnimacionComponent } from './principal/animaciones/primera.component';

const routes: Routes = [
  { path: '', component: PortadaComponent },
  { path: 'interficies', component: AppComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'creditos', component: CreditosComponent },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'comic', component: ComicComponent },
  { path: 'remediaciones', component: RemediacionesComponent },
  { path: 'arqueologia', component: ArqueologiaComponent },
  { path: 'interacciones', component: InteraccionesComponent },
  { path: 'expansiones', component: ExpansionesComponent, children: [
      { path: 'debates', component: DebatesExpansiones },
      { path: 'juego', component: JuegoExpansiones },
      { path: 'narratones', component: NarratonesExpansiones }
    ]
  },
  { path: 'animaciones-primera', component: PrimeraAnimacionComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
