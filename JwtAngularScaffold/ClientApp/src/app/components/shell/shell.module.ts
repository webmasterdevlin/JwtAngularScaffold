import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewDepartmentComponent } from "./new-department/new-department.component";
import { EditDepartmentComponent } from "./edit-department/edit-department.component";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../../auth/auth.guard";
import { DepartmentService } from "../../services/department.service";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    HomeComponent,
    NewDepartmentComponent,
    EditDepartmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
        canActivate: [AuthGuard]
      },
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "edit-detail/:id",
        component: EditDepartmentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "new-department",
        component: NewDepartmentComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [DepartmentService]
})
export class ShellModule {}
