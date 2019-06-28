import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

@Component({
  selector: 'arqueologia-lab',
  templateUrl: './laboratorio.arqueologia.html',
  styleUrls: ['./arqueologo.component.css']
})
export class LaboratorioComponent {
 
  constructor(private userService: UserService, private router: Router) {}

  onContinue() {
    
  }
}