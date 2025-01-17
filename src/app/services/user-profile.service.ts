import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface for creating or updating a user profile
export interface UserProfileRequest {
  userId: string;
  income: number;
  city: string; // Matches backend field
  age: number; // Matches backend field
  gender: 'MAN' | 'WOMAN'; // Matches backend enum
  riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH'; // Matches backend enum
  investmentHistory: (
    | 'ACTIONS'
    | 'IMMOBILIER'
    | 'CRYPTOCURRENCIES'
    | 'ETF'
    | 'OBLIGATIONS'
    | 'STARTUPS'
    | 'COMMODITIES'
    | 'CROWDFUNDING'
    | 'LOCAL_BUSINESSES'
  )[]; // Matches backend possibilities for Investment_History
  financialObjective:
    | 'RETIREMENT'
    | 'SAVINGS'
    | 'REAL_ESTATE_PURCHASE'
    | 'CHILDREN_EDUCATION'
    | 'TRAVEL'
    | 'STARTER_SAVINGS'
    | 'EDUCATION_INVESTMENT'; // Matches backend enum
  preferredSector:
    | 'TECHNOLOGY'
    | 'HEALTH'
    | 'ENERGY'
    | 'FINANCE'
    | 'INDUSTRY'
    | 'CONSUMPTION'
    | 'REAL_ESTATE'
    | 'AGRICULTURE'
    | 'PHARMACEUTICAL'; // Matches backend enum
  investmentFrequency: 'MENSUEL' | 'TRIMESTRIEL' | 'ANNUEL'; // Matches backend enum
  preferredDomains: (
    | 'ACTIONS'
    | 'CRYPTOCURRENCIES'
    | 'REAL_ESTATE'
    | 'BONDS'
    | 'STARTUPS'
    | 'COMMODITIES'
    | 'ETF'
    | 'FUNDRAISING'
    | 'SOCIAL_INVESTMENT'
  )[]; // Matches backend enum
}

// Interface for retrieving a user profile
export interface UserProfileResponse {
  userId: string;
  city: string; // Matches backend field
  age: number; // Matches backend field
  gender: 'MAN' | 'WOMAN'; // Matches backend enum
  income: number;
  riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH'; // Matches backend enum
  investmentFrequency: 'MENSUEL' | 'TRIMESTRIEL' | 'ANNUEL'; // Matches backend enum
  financialObjective:
    | 'RETIREMENT'
    | 'SAVINGS'
    | 'REAL_ESTATE_PURCHASE'
    | 'CHILDREN_EDUCATION'
    | 'TRAVEL'
    | 'STARTER_SAVINGS'
    | 'EDUCATION_INVESTMENT'; // Matches backend enum
  preferredSector:
    | 'TECHNOLOGY'
    | 'HEALTH'
    | 'ENERGY'
    | 'FINANCE'
    | 'INDUSTRY'
    | 'CONSUMPTION'
    | 'REAL_ESTATE'
    | 'AGRICULTURE'
    | 'PHARMACEUTICAL'; // Matches backend enum
  preferredDomains: (
    | 'ACTIONS'
    | 'CRYPTOCURRENCIES'
    | 'REAL_ESTATE'
    | 'BONDS'
    | 'STARTUPS'
    | 'COMMODITIES'
    | 'ETF'
    | 'FUNDRAISING'
    | 'SOCIAL_INVESTMENT'
  )[]; // Matches backend enum
  investmentHistory: (
    | 'ACTIONS'
    | 'IMMOBILIER'
    | 'CRYPTOCURRENCIES'
    | 'ETF'
    | 'OBLIGATIONS'
    | 'STARTUPS'
    | 'COMMODITIES'
    | 'CROWDFUNDING'
    | 'LOCAL_BUSINESSES'
  )[]; // Matches backend possibilities for Investment_History
}

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://user-profile-service:8082/api/v1/profiles'; // Base URL for API requests

  constructor(private http: HttpClient) {}

  /**
   * Create a new user profile
   * @param profile The user profile request object
   * @returns Observable<void>
   */
  createUserProfile(profile: UserProfileRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, profile);
  }

  /**
   * Retrieve a user profile by its ID
   * @param userId The UUID of the user
   * @returns Observable<UserProfileResponse>
   */
  getUserProfile(userId: string): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${this.apiUrl}/${userId}`);
  }

  /**
   * Delete a user profile by its ID
   * @param userId The UUID of the user
   * @returns Observable<string>
   */
  deleteUserProfile(userId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${userId}`);
  }

  /**
   * Retrieve all user profiles
   * @returns Observable<UserProfileResponse[]>
   */
  getAllUserProfiles(): Observable<UserProfileResponse[]> {
    return this.http.get<UserProfileResponse[]>(this.apiUrl);
  }
}
