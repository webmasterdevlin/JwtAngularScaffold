import { Component, OnInit } from '@angular/core';
import {DepartmentModel} from '../../models/department.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit {
  department: DepartmentModel;
  departmentForm: FormGroup;
  id: string;

  constructor(
    private _location: Location,
    private _departmentService: DepartmentService,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.formBuilderInit();
  }

  formBuilderInit(): void {
    this.departmentForm = this._fb.group({
      name: [""],
      description: [""],
      head: [""],
      code: [""]
    });
  }

  onSubmit(): void {
    this.sendCreateDepartment();
  }

  private sendCreateDepartment() {
    const department = <DepartmentModel>this.departmentForm.value;
    this._departmentService.postDepartment(department).subscribe();
    this.back();
  }

  back(): void {
    this._location.back();
  }
}
