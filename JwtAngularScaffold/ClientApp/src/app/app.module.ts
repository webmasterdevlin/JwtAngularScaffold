import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {JwtHelper} from 'angular2-jwt';
import {HttpInterceptorModule} from './auth/http-interceptor.module';
import { SignupComponent } from './components/signup/signup.component';
import {UserService} from './services/user.service';
import {DepartmentService} from './services/department.service';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { NewDepartmentComponent } from './components/new-department/new-department.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    HeaderMenuComponent,
    NewDepartmentComponent,
    EditDepartmentComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpInterceptorModule,
    RouterModule.forRoot([
      { path: '', pathMatch:'full', redirectTo:'/home'},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'new-department', component: NewDepartmentComponent },
      {path: 'edit-detail/:id', component:EditDepartmentComponent},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    ])
  ],
  providers: [JwtHelper, AuthGuard, UserService, DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
