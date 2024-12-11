import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-portal';
  constructor(private router: Router) {}

  logout() {
    // Clear user session data (e.g., remove JWT token or clear localStorage/sessionStorage)
    localStorage.removeItem('token');  // If you're storing the JWT token in localStorage

    // Navigate to the login page or any other page after logout
    this.router.navigate(['/login']);
  }
}
