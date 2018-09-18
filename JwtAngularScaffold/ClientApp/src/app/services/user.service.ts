import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Const} from '../helpers/constants';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {LoginModel} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(form: NgForm): Observable<any> {
    let credentials = JSON.stringify(form.value);
    return this.http.post(Const.loginUrl, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  signin(loginModel: LoginModel): Observable<any> {
    return this.http.post<LoginModel>(Const.loginUrl, loginModel, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  signup(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(Const.registerUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
