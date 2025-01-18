import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KycService } from '../services/kyc.service';

@Injectable({
  providedIn: 'root',
})
export class KycGuard implements CanActivate {
  constructor(private kycService: KycService, private router: Router) {}

  canActivate(): Promise<boolean> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      this.kycService.getKycStatus(userId).subscribe({
        next: (status) => {
          if (status === 'APPROVED') {
            resolve(true);
          } else {
            this.router.navigate(['/kyc-pending']);
            resolve(false);
          }
        },
        error: () => {
          this.router.navigate(['/login']);
          resolve(false);
        },
      });
    });
  }
}
