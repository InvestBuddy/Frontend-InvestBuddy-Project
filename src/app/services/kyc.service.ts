import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KycService {
  private baseUrl = 'http://localhost:8080/api/v1/kyc';

  constructor(private http: HttpClient) {}

  /**
   * Fetch the KYC URL for the given userId.
   */
  getKycUrl(userId: string): Observable<string> {
    // Use `responseType: 'text'` to handle plain text responses
    return this.http.get(`${this.baseUrl}/${userId}/url`, { responseType: 'text' });
  }

  /**
   * Fetch the KYC status for the given userId.
   */
  getKycStatus(userId: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${userId}/status`);
  }
}
