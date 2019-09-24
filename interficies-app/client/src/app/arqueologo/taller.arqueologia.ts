import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../models/user.service';

@Component({
  selector: 'arqueologia-taller',
  templateUrl: './taller.arqueologia.html',
  styleUrls: ['./arqueologo.component.css']
})
export class TallerComponent {
 
  constructor(private userService: UserService, private router: Router) {}

  onAccept(){
      
  }
}