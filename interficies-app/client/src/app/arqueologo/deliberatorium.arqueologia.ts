import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

@Component({
  selector: 'arqueologia-deliberatorium',
  templateUrl: './deliberatorium.arqueologia.html',
  styleUrls: ['./arqueologo.component.css']
})
export class DeliberatoriumComponent {
 
  constructor(private userService: UserService, private router: Router) {}

  onContinue() {
    
  }
}