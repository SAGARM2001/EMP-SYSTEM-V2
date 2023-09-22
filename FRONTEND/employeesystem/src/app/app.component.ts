import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './guard/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check authentication status when the app starts
    this.authService.checkAuthenticationStatus();
  }

  get employeeLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
  }
}
