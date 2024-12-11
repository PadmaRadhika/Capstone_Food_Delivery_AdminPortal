import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { Credentials } from './credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  // private apiUrl = 'http://localhost:8086/api/auth/login';
  private apiUrl = 'http://ec2-35-171-160-2.compute-1.amazonaws.com:8086/api/auth/login';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(credentials: Credentials) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(tap(response => {
      this.token = response.token;
      localStorage.setItem('token', this.token);
    }));
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return (token != null && !this.jwtHelper.isTokenExpired(token));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }
}
