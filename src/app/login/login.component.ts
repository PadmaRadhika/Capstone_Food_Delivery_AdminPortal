import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // for <input> within <mat-form-field>
import { Credentials } from '../credentials';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials : Credentials = new Credentials();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(() => {
      this.router.navigate(['/home']);
    }, error => {      
      this.errorMessage = "Login Failed, Incorrect Credentials!!";
    });
  }
}
