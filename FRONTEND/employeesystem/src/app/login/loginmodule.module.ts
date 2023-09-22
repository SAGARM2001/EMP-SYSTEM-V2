import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
 
@NgModule({
    declarations: [LoginComponent],
    imports: [
        HttpClientModule,
        CommonModule, 
        LoginRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ], providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
