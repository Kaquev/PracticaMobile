import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://67489ff05801f5153591a905.mockapi.io/api/evu2'; // URL base de MockAPI

  constructor(private router: Router) {}

  async register(user: { username: string; password: string }): Promise<void> {
    await axios.post(`${this.apiUrl}/users`, user);
  }

  async login(username: string, password: string): Promise<void> {
    const response = await axios.get(`${this.apiUrl}/users?username=${username}&password=${password}`);
    if (response.data.length > 0) {
      localStorage.setItem('authToken', response.data[0].id);
      this.router.navigate(['/home']);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}