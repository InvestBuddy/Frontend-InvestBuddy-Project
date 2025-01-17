import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/users/auth'; // Base API URL

  constructor(private http: HttpClient) {}

  /**
   * Register a new user
   * @param user User details for registration
   * @returns Observable of the HTTP response
   */
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Verify user's email
   * @param token Verification token
   * @returns Observable of the HTTP response
   */
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-email?token=${token}`);
  }

  /**
   * Log in a user
   * @param credentials User's email and password
   * @returns Observable containing login response (e.g., token and userId)
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);

  }


  /**
   * Save session data (userId and token) to localStorage
   * @param userId The user's unique ID
   * @param token The user's authentication token
   */
  saveSession(userId: string, token: string): void {
    localStorage.setItem('userId', userId);
    localStorage.setItem('authToken', token);
  }

  /**
   * Retrieve session data from localStorage
   * @returns An object containing userId and token
   */
  getSession(): { userId: string | null; token: string | null } {
    return {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('authToken'),
    };
  }

  /**
   * Clear session data from localStorage
   */
  clearSession(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
  }

  /**
   * Check if a user is currently authenticated
   * @returns True if a token is present in localStorage, false otherwise
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
