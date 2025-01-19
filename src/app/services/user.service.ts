import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  birthDate: string; // ISO string format for date
}

export interface UserResponse {
riskTolerance: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthDate: string; // ISO string format for date
  isEmailVerified: boolean;
  verificationToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/users'; // Base API URL for UserService

  constructor(private http: HttpClient) {}

  /**
   * Create a new user.
   * @param user The user data to create.
   * @returns An Observable of the created user's ID.
   */
  createUser(user: UserRequest): Observable<{ id: string }> {
    return this.http
      .post<{ id: string }>(this.apiUrl, user, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Check if a user exists by their ID.
   * @param userId The UUID of the user to check.
   * @returns An Observable indicating if the user exists.
   */
  isUserExists(userId: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}/${userId}/exists`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieve all users.
   * @returns An Observable of the list of users.
   */
  getAllUsers(): Observable<UserResponse[]> {
    return this.http
      .get<UserResponse[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieve a single user by their ID.
   * @param userId The UUID of the user to retrieve.
   * @returns An Observable of the user data.
   */
  getUserById(userId: string): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing user's data.
   * @param userId The UUID of the user to update.
   * @param userData The updated user data.
   * @returns An Observable of the updated user data.
   */
  updateUser(userId: string, userData: UserRequest): Observable<UserResponse> {
    return this.http
      .put<UserResponse>(`${this.apiUrl}/${userId}`, userData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Utility function to get default HTTP headers.
   * @returns HttpHeaders
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  /**
   * Utility function to handle HTTP errors.
   * @param error The error response from HttpClient.
   * @returns Observable throwing an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('UserService error:', error);
    return throwError(() => new Error(error.message || 'An error occurred in UserService.'));
  }
}
