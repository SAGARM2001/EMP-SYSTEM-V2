import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  // Update the authentication status when the user logs in
  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  // Logout the user
  logout(): void {
    // Perform any necessary logout actions (e.g., clearing session data)
    this.isAuthenticated = false;

    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  // Check if the user is authenticated
  checkAuthenticationStatus(): void {
    // Check if a token exists in localStorage to determine authentication status
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }
}
