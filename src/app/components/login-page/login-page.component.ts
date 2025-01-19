import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ThreeParticulesComponent } from "../shared/three-particles/three-particles.component";
import Swal from 'sweetalert2';
import { KycService } from 'src/app/services/kyc.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, ThreeParticulesComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private kycService: KycService
  ) {
    this.titleService.setTitle('IB - Login Page');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all the required fields correctly!',
        confirmButtonColor: '#007bff',
        background: '#f8f9fa',
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;

        // Extract userId and token from the response
        const userId = response; // Since your `login` method only returns the UUID.
        const authToken = response.token || null;

        if (!userId) {
          Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'Failed to retrieve userId from login response.',
            confirmButtonColor: '#dc3545',
            background: '#f8f9fa',
          });
          return;
        }

        // Save session data to localStorage
        this.authService.saveSession(userId, authToken);

        // Fetch KYC status using the userId
        this.kycService.getKycStatus(userId).subscribe({
          next: (kycStatus) => {
            if (kycStatus === 'APPROVED') {
              Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back to InvestBuddy!',
                confirmButtonColor: '#28a745',
                background: '#f8f9fa',
              }).then(() => {
                this.router.navigate(['/User-Profile']);
              });
            } else if (kycStatus === 'PENDING') {
              Swal.fire({
                icon: 'info',
                title: 'KYC Verification Pending',
                text: 'Your KYC verification is still in progress. Please check back later.',
                confirmButtonColor: '#ffc107',
                background: '#f8f9fa',
              });
            } else if (kycStatus === 'DECLINED') {
              Swal.fire({
                icon: 'error',
                title: 'KYC Verification Failed',
                text: 'Your KYC verification was declined. Please contact support for assistance.',
                confirmButtonColor: '#dc3545',
                background: '#f8f9fa',
              });
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('KYC Status error:', error);
            Swal.fire({
              icon: 'error',
              title: 'KYC Status Error',
              text: 'Failed to retrieve KYC status. Please try again later.',
              confirmButtonColor: '#dc3545',
              background: '#f8f9fa',
            });
          },
        });
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text:
            error?.status === 401
              ? 'Invalid email or password. Please try again.'
              : 'An unexpected error occurred. Please try again later.',
          confirmButtonColor: '#dc3545',
          background: '#f8f9fa',
        });
        console.error('Login error:', error);
      },
    });
  }






  ngAfterViewInit(): void {
    // Initialize features after DOM is rendered
    this.initSpinner();
    this.initWOW();
    this.initFixedNavbar();
    this.initBackToTop();
    this.initCounters();
    this.initProjectCarousel();
    this.initTestimonialCarousel();
    this.initHeaderCarousel();
  }

  private initSpinner(): void {
    const spinner = document.getElementById('spinner');
    if (spinner) {
      setTimeout(() => {
        spinner.classList.remove('show');
      }, 1);
    }
  }

  private initWOW(): void {
    // Initialize WOW.js animations
    if ((window as any).WOW) {
      new (window as any).WOW().init();
    }
  }

  private initFixedNavbar(): void {
    const fixedTop = document.querySelector('.fixed-top') as HTMLElement;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      if (window.innerWidth < 992) {
        fixedTop?.classList.toggle('bg-white', scrollTop > 45);
        fixedTop?.classList.toggle('shadow', scrollTop > 45);
      } else {
        fixedTop?.classList.toggle('bg-white', scrollTop > 45);
        fixedTop?.classList.toggle('shadow', scrollTop > 45);
        if (fixedTop) {
          fixedTop.style.top = scrollTop > 6 ? '-6px' : '0';
        }
      }
    });
  }

  private initBackToTop(): void {
    const backToTop = document.querySelector('.back-to-top') as HTMLElement;
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.style.display = 'block';
        } else {
          backToTop.style.display = 'none';
        }
      });

      backToTop.addEventListener('click', (event: Event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  private initCounters(): void {
    const counterElements = document.querySelectorAll<HTMLElement>('[data-toggle="counter-up"]');
    if ((window as any).CounterUp) {
      counterElements.forEach((el) => {
        const counterUp = (window as any).CounterUp.default;
        counterUp(el, { delay: 10, time: 2000 });
      });
    }
  }

  private initProjectCarousel(): void {
    const projectCarousel = document.querySelector('.project-carousel');
    if ((window as any).OwlCarousel && projectCarousel) {
      new (window as any).OwlCarousel(projectCarousel, {
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 3 },
        },
      });
    }
  }

  private initTestimonialCarousel(): void {
    // Initialize Owl Carousel for testimonials
    (('.testimonial-carousel') as any).owlCarousel({
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1000,
      dots: true,
      loop: true,
      nav: false,
      margin: 30,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });
  }

  private initHeaderCarousel(): void {
    const carousel = document.getElementById('header-carousel');
    if (carousel) {
      const bootstrapCarousel = new (window as any).bootstrap.Carousel(carousel, {
        interval: 2000, // Auto-slide every 2 seconds
        ride: 'carousel', // Automatic sliding
      });
    }
  }




}
