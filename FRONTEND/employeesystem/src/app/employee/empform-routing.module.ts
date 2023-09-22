import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";

const empformroutes: Routes = [
    { path: '', component: EmployeeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(empformroutes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {

}