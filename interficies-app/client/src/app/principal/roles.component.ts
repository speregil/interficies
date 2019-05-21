import { Component, OnInit} from '@angular/core';
import { UserService } from '../models/user.service';

@Component({
  selector: 'comic',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {

    constructor(private userService: UserService) {}

    isLogged : boolean;

    ngOnInit() {
        this.isLogged = this.userService.isUserLogged();
    }
}