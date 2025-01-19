import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service';

@Component({
  selector: 'app-kyc-verification',
  templateUrl: './kyc-verification.component.html',
  styleUrls: ['./kyc-verification.component.css']
})
export class KycVerificationComponent implements OnInit {
  userId: string | null = null;
  kycUrl: string | null = null;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private kycService: KycService) {}

  ngOnInit(): void {
    // Try to fetch userId from query parameters first
    this.userId = this.route.snapshot.queryParamMap.get('userId');

    // If not present, retrieve it from localStorage
    if (!this.userId) {
      this.userId = localStorage.getItem('userId');
    }

    if (this.userId) {
      this.fetchKycUrl();
    } else {
      console.error('Missing userId.');
      this.redirectToLoginWithError();
    }
  }

  private fetchKycUrl(): void {
    if (this.userId) {
      this.kycService.getKycUrl(this.userId).subscribe({
        next: (url) => {
          this.kycUrl = url;
          console.log('KYC URL:', this.kycUrl);
          this.router.navigate([this.kycUrl]);
          this.isLoading = false;

          // Clear userId from localStorage after fetching KYC URL
          localStorage.removeItem('userId');
        },
        error: (err) => {
          console.error('Error fetching KYC URL:', err);
          this.redirectToLoginWithError();
        },
      });
    }
  }

  private redirectToLoginWithError(): void {
    this.isLoading = false;
    alert('Failed to fetch KYC link. Please contact support.');
    this.router.navigate(['/login']);
  }
}
