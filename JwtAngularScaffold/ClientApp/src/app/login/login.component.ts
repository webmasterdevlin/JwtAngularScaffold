import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Location } from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient, private _location: Location) {
  }

  login(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    this.http.post('/api/auth/login', credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => {
      let token = (<any>response).token;

      console.log("new token: ", JSON.stringify(token));

      localStorage.setItem('jwt', token);

      console.log("token has been stored locally");

      this.invalidLogin = false;
      this.router.navigate(['/']);
    }, err => {
      this.invalidLogin = true;
      console.log("invalid login");
    });
  }

  back(): void {
    this._location.back();
  }
}
