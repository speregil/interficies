import { Component} from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../models/user.service';

@Component({
  selector: 'animacion-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.css']
})

export class PrimeraAnimacionComponent {

  constructor(private userService: UserService,  private router: Router) {}

  onContinue() {
    this.userService.setInitComic("1");
    this.userService.setLastComic("2");
    this.router.navigate(['comic']);
  }
}