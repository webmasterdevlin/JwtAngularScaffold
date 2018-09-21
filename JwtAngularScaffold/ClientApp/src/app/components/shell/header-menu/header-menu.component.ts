import { Component } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {

  constructor(private jwtHelper: JwtHelper, private router: Router) {
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
