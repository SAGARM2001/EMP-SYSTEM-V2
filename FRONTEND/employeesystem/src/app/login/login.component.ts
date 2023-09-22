import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService  // Inject your AuthService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;

      this.http.post<any>('http://localhost:3000/api/login', { userName, password }).subscribe(
        (response) => {
          if (response.message === 'Login successful') {
            // Update the authentication status in the AuthService
            this.authService.setAuthenticationStatus(true);

            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);

            this.router.navigate(['/welcome'], { queryParams: { user: JSON.stringify(response.user) } });
          } else {
            console.error('Login failed:', response.message);
          }
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
    } 
  }
}
