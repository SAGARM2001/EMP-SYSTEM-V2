import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './empform-routing.module';
 
@NgModule({
    declarations: [EmployeeComponent],
    imports: [
        HttpClientModule,
        CommonModule, 
        EmployeeRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ], providers: [],
    bootstrap: [EmployeeComponent]
})
export class EmployeeModule { }
