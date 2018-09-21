import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { JwtHelper } from "angular2-jwt";
import { HttpInterceptorModule } from "./auth/http-interceptor.module";
import { SignupComponent } from "./components/signup/signup.component";
import { UserService } from "./services/user.service";
import {ShellLayoutComponent} from './components/shell/shell-layout.component';
import {HomeComponent} from './components/shell/home/home.component';
import {HeaderMenuComponent} from './components/shell/header-menu/header-menu.component';

@NgModule({
  declarations: [AppComponent, HeaderMenuComponent, ShellLayoutComponent,HomeComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpInterceptorModule,
    RouterModule.forRoot([
      {
        path: "",
        component: ShellLayoutComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: "",
            component: HomeComponent,
            canActivate: [AuthGuard],
            loadChildren: "app/components/shell/shell.module#ShellModule"
          }
        ]
      },
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "**", redirectTo: "" }
    ])
  ],
  providers: [JwtHelper, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
