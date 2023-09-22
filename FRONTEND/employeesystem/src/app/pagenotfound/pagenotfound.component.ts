import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error-404',
    templateUrl: './pagenotfound.component.html',
    styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {

    constructor(private router: Router) { }

    navigateToLogin() {
        this.router.navigate(['/login']); // Replace 'login' with the actual route to your login page
    }
}
