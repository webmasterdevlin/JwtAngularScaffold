import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private jwtHelper: JwtHelper, private router: Router) {
  }
  canActivate() {
    const token = localStorage.getItem("jwt");

    console.log("local storage: ", JSON.stringify(token));

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
