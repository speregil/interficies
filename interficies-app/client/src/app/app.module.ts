import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistroComponent } from './principal/registro.component';
import { RemediacionesComponent } from './remediaciones/remediaciones.component';
import { ArqueologiaComponent } from './arqueologia/arqueologia.component';
import { ExpansionesComponent } from './expansiones/expansiones.component';
import { DebatesExpansiones } from './expansiones/debates/debates.expansiones';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    RemediacionesComponent,
    ArqueologiaComponent,
    ExpansionesComponent,
    DebatesExpansiones
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
