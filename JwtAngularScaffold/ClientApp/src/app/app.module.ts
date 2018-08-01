import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {JwtHelper} from 'angular2-jwt';
import {HttpInterceptorModule} from './auth/http-interceptor.module';
import { SalesComponent } from './sales/sales.component';
import { SignupComponent } from './signup/signup.component';
import {UserService} from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomersComponent,
    HomeComponent,
    SalesComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpInterceptorModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
    ])
  ],
  providers: [JwtHelper, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
