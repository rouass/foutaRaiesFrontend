import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private userRole: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserRole() {
    return this.userRole;
  }

  login(phone: string, password: string) {
    const loginData = { phone, password };
    this.http.post<{ token: string, expiresIn: number, userRole: string }>('http://localhost:4401/api/users/login', loginData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.userRole = response.userRole;

          // Store token and role in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', this.userRole);

          this.authStatusListener.next(true);
          this.router.navigate(['/']);  // Redirect to home or other route after login
        }
      }, error => {
        console.error('Login failed:', error);
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.userRole = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);  // Redirect to login after logout
  }

  autoAuthUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.userRole = localStorage.getItem('userRole');
      this.authStatusListener.next(true);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);
    return !!token;
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin';
  }

}
