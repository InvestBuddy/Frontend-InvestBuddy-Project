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
    // Ensure the response is treated as plain text
    return this.http.get(`${this.baseUrl}/${userId}/url`, { responseType: 'text' });
  }

  /**
   * Fetch the KYC status for the given userId.
   */
  getKycStatus(userId: string): Observable<'APPROVED' | 'DECLINED' | 'PENDING'> {
    // Expect the API to return a specific string enum
    return this.http.get<'APPROVED' | 'DECLINED' | 'PENDING'>(`${this.baseUrl}/${userId}/status`);
  }

  /**
   * Send a webhook payload to the backend for processing.
   */
  handleWebhook(payload: any): Observable<void> {
    // POST the webhook payload to the designated endpoint
    return this.http.post<void>(`${this.baseUrl}/webhook/decisions`, payload);
  }
}
