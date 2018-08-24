import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../models/user.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.formBuilderInit();
  }

  formBuilderInit(): void {
    this.signupForm = this.fb.group({
      userName: [""],
      email: [""],
      password: [""]
    });
  }

  back(): void {
    this.location.back();
  }

  onSubmit(): void {
    // You can validate all your fields here before sending loginForm
    this.sendSignupForm();
  }

  private sendSignupForm(): void {
    const user = <User>this.signupForm.value;
    this.userService.signup(user).subscribe(response => {
      this.router.navigate(["/"]);
    });
  }
}
