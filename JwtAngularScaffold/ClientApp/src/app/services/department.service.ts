import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {Const} from '../helpers/constants';
import {DepartmentModel} from '../models/department.model';
import {AuthBearer} from '../helpers/httpHeaders';

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}

  loadDepartments(): Observable<DepartmentModel[]> {
    return this._httpClient
      .get<DepartmentModel[]>(
        `${Const.departmentUrl}`,
        AuthBearer.options
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  getDepartment(id: string): Observable<DepartmentModel> {
    return this._httpClient
      .get<DepartmentModel>(
        `${Const.departmentUrl}${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  postDepartment(department: DepartmentModel): Observable<any> {
    return this._httpClient
      .post<DepartmentModel>(
        `${Const.departmentUrl}`,
        department
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  putDepartment(department: DepartmentModel): Observable<any> {
    console.log("DEPT ID IS ",department.id)
    return this._httpClient
      .put<DepartmentModel>(
        `${Const.departmentUrl}${
          department.id
          }`,
        department
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  deleteDepartment(id: string): Observable<any> {
    return this._httpClient
      .delete<DepartmentModel>(
        `${Const.departmentUrl}${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }
}
