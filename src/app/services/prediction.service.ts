import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService, UserResponse } from './user.service';

export interface PredictionRequest {
  Gender: string;
  City: string;
  Age: string;
  Income: string;
  Risk_Tolerance: string;
  Investment_History: string[];
  Financial_Objective: string;
  Preferred_Sector: string;
  Investment_Frequency: string;
  PreferredDomain: string[];
}

export interface PredictionResponse {
  recommended_domain: string;
  match_preferred_domain: boolean;
  selected_sector: string;
  preferred_domains_sent: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private gatewayUrl = 'http://prediction-service:8080/api/v1/prediction/predict';

  constructor(private http: HttpClient, private userService: UserService) {}

  private calculateAge(birthDate: string): string {
    const birthDateObj = new Date(birthDate);
    const ageDiff = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageDiff);
    return (Math.abs(ageDate.getUTCFullYear() - 1970)).toString();
  }

  preparePredictionRequest(userId: string): Observable<PredictionRequest | null> {
    const storedData = localStorage.getItem('userProfile');
    if (!storedData) {
      return of(null);
    }

    const userProfile = JSON.parse(storedData);
    return this.userService.getUserById(userId).pipe(
      map((user: UserResponse) => {
        return {
          Gender: userProfile.gender,
          City: userProfile.city,
          Age: this.calculateAge(user.birthDate),
          Income: userProfile.income.toString(),
          Risk_Tolerance: userProfile.riskTolerance,
          Investment_History: userProfile.investmentHistory,
          Financial_Objective: userProfile.financialObjective,
          Preferred_Sector: userProfile.preferredSector,
          Investment_Frequency: userProfile.investmentFrequency,
          PreferredDomain: userProfile.preferredDomains,
        };
      })
    );
  }

  sendPredictionRequest(predictionRequest: PredictionRequest): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(this.gatewayUrl, predictionRequest);
  }
}
