import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";

const loginroutes: Routes = [
    { path: '', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(loginroutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {

}