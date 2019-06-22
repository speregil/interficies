import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PortadaComponent } from './principal/portada.component';
import { RolesComponent } from './principal/roles.component';
import { RegistroComponent } from './principal/registro/registro.component';
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
import { AppRoutingModule } from './/app-routing.module';

import { PrimeraAnimacionComponent } from './principal/animaciones/primera.component';
import { IntroFuturologoComponent } from './principal/animaciones/introFuturologo.component';
import { IntroArqueologoComponent } from './principal/animaciones/introArqueologo.component';
import { IntroJuglarComponent } from './principal/animaciones/introJuglar.component';

import { RegistroService } from './principal/registro/registro.service';
import { UserService } from './models/user.service';

@NgModule({
  declarations: [
    AppComponent,
    PortadaComponent,
    RolesComponent,
    RegistroComponent,
    CreditosComponent,
    InstruccionesComponent,
    ComicComponent,
    LogrosComponent,
    RemediacionesComponent,
    ArqueologoComponent,
    JuglarComponent,
    MainFuturologoComponent,
    ExpansionesComponent,
    DebatesExpansiones,
    JuegoExpansiones,
    NarratonesExpansiones,
    PrimeraAnimacionComponent,
    IntroFuturologoComponent,
    IntroArqueologoComponent,
    IntroJuglarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RegistroService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
