import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PortadaComponent } from './principal/portada.component';
import { RegistroComponent } from './principal/registro/registro.component';
import { RolesComponent } from './principal/roles.component';
import { CreditosComponent } from './principal/creditos/creditos.component';
import { InstruccionesComponent } from './principal/instrucciones/instrucciones.component';
import { ComicComponent } from './principal/comic/comic.component';
import { LogrosComponent } from './principal/logros/logros.component';
import { RemediacionesComponent } from './remediaciones/remediaciones.component';
import { ArqueologoComponent } from './arqueologo/arqueologo.component';
import { JuglarComponent } from './juglar/juglar.component';
import { MainFuturologoComponent } from './futurologo/mainFuturologo.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';
import { DebatesExpansiones } from './expansiones/debates/debates.expansiones';
import { JuegoExpansiones } from './expansiones/juego/juego.expansiones';
import { NarratonesExpansiones } from './expansiones/narratones/narratones.expansiones';
import { AppComponent } from './app.component';

import { PrimeraAnimacionComponent } from './principal/animaciones/primera.component';
import { IntroFuturologoComponent } from './principal/animaciones/introFuturologo.component';
import { IntroArqueologoComponent } from './principal/animaciones/introArqueologo.component';
import { IntroJuglarComponent } from './principal/animaciones/introJuglar.component';

const routes: Routes = [
  { path: '', redirectTo: '/portada', pathMatch: 'full' },
  { path: 'portada', component: PortadaComponent },
  { path: 'interficies', component: AppComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'creditos', component: CreditosComponent },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'comic', component: ComicComponent },
  { path: 'logros', component: LogrosComponent },
  { path: 'remediaciones', component: RemediacionesComponent },
  { path: 'arqueologo', component: ArqueologoComponent },
  { path: 'futurologo', component: MainFuturologoComponent },
  { path: 'juglar', component: JuglarComponent },
  { path: 'expansiones', component: ExpansionesComponent, children: [
      { path: 'debates', component: DebatesExpansiones },
      { path: 'juego', component: JuegoExpansiones },
      { path: 'narratones', component: NarratonesExpansiones }
    ]
  },
  { path: 'animaciones-primera', component: PrimeraAnimacionComponent },
  { path: 'animaciones-futurologo', component: IntroFuturologoComponent },
  { path: 'animaciones-arqueologo', component: IntroArqueologoComponent },
  { path: 'animaciones-juglar', component: IntroJuglarComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
