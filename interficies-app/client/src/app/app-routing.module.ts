import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortadaComponent } from './principal/portada.component';
import { RolesComponent } from './principal/roles.component';
import { CreditosComponent } from './principal/creditos/creditos.component';
import { InstruccionesComponent } from './principal/instrucciones/instrucciones.component';
import { ComicComponent } from './principal/comic/comic.component';
import { LogrosComponent } from './principal/logros/logros.component';
import { RemediacionesComponent } from './remediaciones/remediaciones.component';
import { LaboratorioComponent } from './arqueologo/laboratorio.arqueologia';
import { DeliberatoriumComponent } from './arqueologo/deliberatorium.arqueologia';
import { JuglarComponent } from './juglar/juglar.component';
import { MainFuturologoComponent } from './futurologo/mainFuturologo.component';
import { InvestigadorComponent } from './investigador/investigador.component';
import { InterpreteComponent } from './interprete/interprete.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';
import { DebatesExpansiones } from './expansiones/debates/debates.expansiones';
import { JuegoExpansiones } from './expansiones/juego/juego.expansiones';
import { NarratonesExpansiones } from './expansiones/narratones/narratones.expansiones';
import { AppComponent } from './app.component';

import { PrimeraAnimacionComponent } from './principal/animaciones/primera.component';
import { IntroFuturologoComponent } from './principal/animaciones/introFuturologo.component';
import { IntroJuglarComponent } from './principal/animaciones/introJuglar.component';
import { IntroLaboratorioComponent } from './principal/animaciones/introLaboratorio.component';
import { IntroDeliberatoriumComponent } from './principal/animaciones/introDeliberatorium.component';
import { IntroInvestigadorComponent } from './principal/animaciones/introInvestigador.component';
import { IntroInterpreteComponent } from './principal/animaciones/introInterprete.component';

const routes: Routes = [
  { path: '', redirectTo: '/portada', pathMatch: 'full' },
  { path: 'portada', component: PortadaComponent },
  { path: 'interficies', component: AppComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'creditos', component: CreditosComponent },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'comic', component: ComicComponent },
  { path: 'logros', component: LogrosComponent },
  { path: 'remediaciones', component: RemediacionesComponent },
  { path: 'futurologo', component: MainFuturologoComponent },
  { path: 'juglar', component: JuglarComponent },
  { path: 'laboratorio', component: LaboratorioComponent },
  { path: 'deliberatorium', component: DeliberatoriumComponent },
  { path: 'investigador', component: InvestigadorComponent },
  { path: 'interprete', component: InterpreteComponent },
  { path: 'expansiones', component: ExpansionesComponent, children: [
      { path: 'debates', component: DebatesExpansiones },
      { path: 'juego', component: JuegoExpansiones },
      { path: 'narratones', component: NarratonesExpansiones }
    ]
  },
  { path: 'animaciones-primera', component: PrimeraAnimacionComponent },
  { path: 'animaciones-futurologo', component: IntroFuturologoComponent },
  { path: 'animaciones-juglar', component: IntroJuglarComponent },
  { path: 'animaciones-laboratorio', component: IntroLaboratorioComponent },
  { path: 'animaciones-deliberatorium', component: IntroDeliberatoriumComponent  },
  { path: 'animaciones-investigador', component: IntroInvestigadorComponent  },
  { path: 'animaciones-interprete', component: IntroInterpreteComponent  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
