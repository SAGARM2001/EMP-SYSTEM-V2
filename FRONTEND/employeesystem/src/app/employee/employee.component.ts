import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  employeeForm: FormGroup;
  addingNewEmployee: boolean = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    // VALIDATIONS
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/), Validators.minLength(5)]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  // ADDING ROWS IN TABLE
  addRow() {
    this.addingNewEmployee = true;
  }

  // ADDING DATA OF EMPLOYEE TO DB
  addNewEmployee() {
    const formData = this.employeeForm.value;
    this.http.post('http://localhost:3000/api/add', formData).subscribe(
      (response) => {
        console.log('Employee added successfully!');
        alert("User Added Successfully")
        this.employeeForm.reset();
        this.addingNewEmployee = false; // Reset the flag
        this.fetchData(); // Fetch data again after adding the new employee
      },
      (error) => {
        alert('Email already present')
        console.error('Error while submitting form data:', error);
      }
    );
  }

  // Cancel adding a new employee
  cancelAddEmployee() {
    this.employeeForm.reset();
    this.addingNewEmployee = false; // Reset the flag
  }

  // RETRIEVE DATA FROM DB 
  fetchData() {
    this.http.get('http://localhost:3000/api/getdata').subscribe(
      (response: any) => {
        console.log(response)
        this.employees = response.data;
      },
      (error) => {
        console.error('Error while fetching data:', error);
      }
    );
  }

  // Enable editing for a specific employee
  editEmployee(employee: any) {
    employee.isEditing = true;
  }

  // UPDATING EMPLOYEE DATA
  updateEmployee(employee: any) {
    const updatedEmployeeData = {
      empId: employee.emp_id,
      firstName: employee.fname,
      lastName: employee.lname,
      contact: employee.contact,
      email: employee.email,
      dob: employee.dob,
      address: employee.address
    };

    this.http.put(`http://localhost:3000/api/empupdate/${employee.emp_id}`, updatedEmployeeData)
      .subscribe(
        (response: any) => {
          console.log('Employee updated successfully!');
          alert('Employee Updated Successfully');
          employee.isEditing = false; 
          this.fetchData();
          window.location.reload();
        },
        (error) => {
          console.error('Error updating employee data:', error);
        }
      );
  }

  // DELETE EMPLOYEE
  deleteEmp(empId: number) {
    this.http.delete(`http://localhost:3000/api/delemp/${empId}`).subscribe(
      (response: any) => {
        if (response.message === 'Employee Deleted Successfully!') {
          this.employees = this.employees.filter((user) => user.emp_id !== empId);
          alert('Employee Deleted Successfully');
          window.location.reload();
        } else {
          console.error('Employee Deletion Failed:', response.message);
        }
      },
      (error) => {
        console.error('Error during user deletion:', error);
      }
    );
  }


}
