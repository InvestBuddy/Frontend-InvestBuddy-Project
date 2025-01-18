import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service'; // Import your KYC service

@Component({
  selector: 'app-verification-success',
  templateUrl: './verification-success.component.html',
  styleUrls: ['./verification-success.component.css']
})
export class VerificationSuccessComponent implements OnInit {
  userId: string | null = null;
  token: string | null = null;
  isLoading: boolean = true;
  isVerified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kycService: KycService // Inject the KYC service
  ) {}

  ngOnInit(): void {
    // Retrieve parameters from the URL
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.userId && this.token) {
      console.log(`Verifying userId: ${this.userId}, token: ${this.token}`);
      this.isVerified = true;
      this.fetchKycUrl(); // Fetch the KYC link immediately
    } else {
      console.error('Verification failed: Missing parameters.');
      this.isVerified = false;
    }
  }

  /**
   * Fetches the KYC URL from the backend and redirects the user to it.
   */
  private fetchKycUrl(): void {
    if (this.userId) {
      this.kycService.getKycUrl(this.userId).subscribe({
        next: (url: string) => {
          console.log('KYC URL:', url);
          // Automatically redirect to the KYC link
          window.location.href = url;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Error fetching KYC URL:', err);
          this.redirectToLoginWithError();
        }
      });
    }
  }

  /**
   * Redirects the user to the login page if fetching KYC URL fails.
   */
  private redirectToLoginWithError(): void {
    this.isLoading = false;
    alert('Failed to fetch KYC link. Please contact support.');
    this.router.navigate(['/login']);
  }
}
