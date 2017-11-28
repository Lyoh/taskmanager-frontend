import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public signOutUser() {
    this.authService.signOut()
      .subscribe(
        () => this.router.navigate(['/sign-in'])
      );
  }
 }
