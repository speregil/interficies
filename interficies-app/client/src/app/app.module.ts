import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PortadaComponent } from './principal/portada.component';
import { RegistroComponent } from './principal/registro/registro.component';
import { CreditosComponent } from './principal/creditos/creditos.component';
import { InstruccionesComponent } from './principal/instrucciones/instrucciones.component';
import { RemediacionesComponent } from './remediaciones/remediaciones.component';
import { ArqueologiaComponent } from './arqueologia/arqueologia.component';
import { InteraccionesComponent } from './interacciones/interacciones.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';
import { DebatesExpansiones } from './expansiones/debates/debates.expansiones';
import { JuegoExpansiones } from './expansiones/juego/juego.expansiones';
import { NarratonesExpansiones } from './expansiones/narratones/narratones.expansiones';
import { AppRoutingModule } from './/app-routing.module';

import { RegistroService } from './principal/registro/registro.service';


@NgModule({
  declarations: [
    AppComponent,
    PortadaComponent,
    RegistroComponent,
    CreditosComponent,
    InstruccionesComponent,
    RemediacionesComponent,
    ArqueologiaComponent,
    InteraccionesComponent,
    ExpansionesComponent,
    DebatesExpansiones,
    JuegoExpansiones,
    NarratonesExpansiones
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RegistroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
