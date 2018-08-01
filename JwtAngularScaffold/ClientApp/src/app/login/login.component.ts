import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { Location } from "@angular/common";
import { UserService } from "../services/user.service";
import { LoginModel } from "../models/login.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
  }

  formBuilderInit(): void {
    this.loginForm = this.fb.group({
      userName: [""],
      password: [""]
    });
  }

  onSubmit(): void {
    // You can validate all your fields here before sending loginForm
    this.sendLoginForm();
  }

  private sendLoginForm(): void {
    const loginModel = <LoginModel>this.loginForm.value;
    this.userService.signin(loginModel).subscribe(
      response => {
        let token = (<any>response).token;

        console.log("new token: ", JSON.stringify(token));

        localStorage.setItem("jwt", token);

        console.log("token has been stored locally");

        this.invalidLogin = false;
        this.router.navigate(["/"]);
      },
      err => {
        this.invalidLogin = true;
        console.log("invalid login");
      }
    );
  }

  back(): void {
    this.location.back();
  }
}
