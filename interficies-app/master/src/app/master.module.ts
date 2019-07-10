import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MasterRoutingModule } from './master-routing.module';

import { MasterComponent } from './master.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './registro/login.component';

@NgModule({
  declarations: [
    MasterComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MasterRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ MasterComponent ]
})

export class MasterModule { }
