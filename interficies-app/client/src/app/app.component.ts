import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { RegistroService } from './principal/registro/registro.service';
import { UserService } from './models/user.service';
import { User } from './models/user.model';
import { LoginObserver } from './models/loginObserver.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * Componente que controla la barra principal de la página
 */
export class AppComponent {
  
  loginObservers: LoginObserver[];   // Lista de componentes que necesitan ser notificados cuando se realiza un login

  username = "";      // Nombre del usuario que desea ingresar
  password = "";      // Password del usuario que desea ingresar
  loggedUser = null;  // Objeto que representa la infromación de un usuario loggeado

//-------------------------------------------------------------------------------------------------------------------------------
// Constructor
//-------------------------------------------------------------------------------------------------------------------------------

  constructor(private registro: RegistroService, private userService: UserService, private router: Router){
    this.loginObservers = new Array();
    this.updateLogin();
  }

//-------------------------------------------------------------------------------------------------------------------------------
// Funciones
//-------------------------------------------------------------------------------------------------------------------------------

  /**
   * Maneja el proceso de ingreso seguro al portal y actualiza la información en la barra
   */
  login(){
    this.registro.login(this.username, this.password).subscribe(data => {
      if(data['status'] > 0 )
        alert(data['mensaje']);
      else{
        var userModel = data["data"];
        this.userService.getProgressProfile(userModel["username"]).subscribe(progress => {
          var progressModel = progress["progOb"];
          var user : User = new User(this.username, userModel["shownName"], progressModel["currentRol"], progressModel["level"], progressModel["achivements"]);        
          user.currentGender = progressModel["avatar"].split('-')[0];
          this.userService.setUserLoggedIn(user);
          this.loggedUser = this.userService.getUserLoggedIn();

          this.username = "";
          this.password = "";

          this.notifyLogin(true);  //Notifica que hubo un login a todos los observadores
        });
      }     
    });
  }

  /**
   * Captura la información necesaria para ejecutar un login que otro componente ha solicitado
   * @param user Nombre de usuario
   * @param pass Password
   */
  externalLogin(user, pass) {
    this.username = user;
    this.password = pass;
    this.login();
  }
  /**
   * Actualiza el usuario en sesión si se ha hecho un login externo
   */
  updateLogin() {
    this.loggedUser = this.userService.getUserLoggedIn();

    if(this.loggedUser) {
      this.username = "";
      this.password = "";
    }
  }

  /**
   * Termina la sesión de un usuario y notifica el proceso a todos los observadores registrados
   */
  logout(){
    this.userService.setUserLoggedOut();
    this.loggedUser = null;

    this.notifyLogin(false);
  }

  /**
   * Comunica si hay un usuario loggeado en el sistema actualmente
   */
  isLogged(){
    return this.userService.isUserLogged();
  }

  goHome(){
    if(this.loggedUser) {
      if(this.loggedUser.currentRol != 'Ninguno'){
        this.router.navigate(["roles"]);
      }
      else{
        this.router.navigate(["portada"]);
      }
    }
    else{
      this.router.navigate(["portada"]);
    }
  }

  /**
   * Funciones para obtener la información del usuario y de su progreso del objeto conservado en memoria
   */

  getShownName(){
    if(this.loggedUser) {
      return this.loggedUser.shownName;
    }
    else
      return "";
  }

  getCurrentRol(){
    if(this.loggedUser) {
      return this.loggedUser.currentRol;
    }
    else
      return "";
  }

  getLevel(){
    if(this.loggedUser) {
      return this.loggedUser.level;
    }
    else
      return "";
  }

  getPoints() {
    if(this.loggedUser) {
      return this.loggedUser.points;
    }
    else
      return "";
  }

  /**
   * Actualiza el rol del usuario en sesión si otro componente ha solicitado el cambio
   * @param role Nuevo rol del usuario
   */
  updateRole( role ) {
    var currentUser = this.userService.getUserLoggedIn();
    this.userService.updateRole(currentUser.username, role).subscribe(response => {
      if(response["status"] > 0){
        alert(response["mensaje"]);
      }
      else {
        this.loggedUser.role = role;
      }
    });
  }

  /**
   * Agrega un nuevo observador a la lista de componenetes que deben ser notificados de un login
   * @param newObserver Componente que implementa la interfaz de observador
   */
  addLoginObserver (newObserver: LoginObserver) {
    this.loginObservers.push(newObserver);
  }

  /**
   * Notifica a todos los observadores de un login
   * @param logged Determina si la notificación es de login o logout
   */
  private notifyLogin(logged: boolean) {
    for (var observer of this.loginObservers) {
        observer.notifyLogin(logged);
    }
  }
}
