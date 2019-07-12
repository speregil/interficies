import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MasterRoutingModule } from './master-routing.module';

import { UserService } from './services/user.service';

import { MasterComponent } from './master.component';
import { PrincipalComponent } from './principal.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './registro/login.component';

@NgModule({
  declarations: [
    MasterComponent,
    PrincipalComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MasterRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [ MasterComponent ]
})

export class MasterModule { }
