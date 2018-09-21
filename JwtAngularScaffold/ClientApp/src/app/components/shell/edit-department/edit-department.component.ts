import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ISubscription } from "rxjs-compat/Subscription";
import { Location } from "@angular/common";
import {DepartmentModel} from '../../../models/department.model';
import {DepartmentService} from '../../../services/department.service';

@Component({
  selector: "app-edit-department",
  templateUrl: "./edit-department.component.html",
  styleUrls: ["./edit-department.component.css"]
})
export class EditDepartmentComponent implements OnInit {
  department: DepartmentModel;
  sub: ISubscription;
  departmentForm: FormGroup;
  id: string;

  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _fb: FormBuilder
  ) {
    this.getDepartmentFromRoute();
  }

  ngOnInit() {
    this.formBuilderInit();
  }

  getDepartmentFromRoute(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get("id");
    this.sub = this._departmentService
      .getDepartment(this.id)
      .subscribe(data => {
        this.department = data;
        console.log(JSON.stringify(this.department.id));
      });
  }

  formBuilderInit(): void {
    this.departmentForm = this._fb.group({
      id: [this.id],
      name: [""],
      description: [""],
      head: [""],
      code: [""]
    });
  }

  onSubmit(): void {
    this.updateDepartment();
  }

  private updateDepartment() {
    const department = <DepartmentModel>this.departmentForm.value;
    this._departmentService
      .putDepartment(department)
      .subscribe();
    this.back();
  }

  deleteDepartment() {
    this._departmentService.deleteDepartment(this.department.id).subscribe();
    this.back();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  back(): void {
    this._location.back();
  }
}
