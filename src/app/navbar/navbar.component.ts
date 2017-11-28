import { AuthService } from './../shared/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}
 }
