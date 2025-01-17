import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { UserProfileService, UserProfileRequest } from 'src/app/services/user-profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ParticulesDashComponent } from "../shared/particules-dash/particules-dash.component";
import { RouterModule, Router } from '@angular/router';
import { UserResponse, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ParticulesDashComponent],
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;

  // Options aligned with the backend enums
  genderOptions = ['MAN', 'WOMAN'];
  riskToleranceOptions = ['LOW', 'MEDIUM', 'HIGH'];
  financialObjectiveOptions = [
    'RETIREMENT',
    'SAVINGS',
    'REAL_ESTATE_PURCHASE',
    'CHILDREN_EDUCATION',
    'TRAVEL',
    'STARTER_SAVINGS',
    'EDUCATION_INVESTMENT',
  ];
  investmentFrequencyOptions = ['MENSUEL', 'TRIMESTRIEL', 'ANNUEL'];
  preferredSectorOptions = [
    'ACTIONS',
    'CRYPTOCURRENCIES',
    'ETF',
    'IMMOBILIER',
    'OBLIGATIONS',
    'STARTUPS',
  ];

  investmentHistoryOptions = [
    'immobilier',
    'actions',
    'cryptomonnaies',
    'ETF',
    'obligations',
    'startups',
    'fonds socialement responsables',
    'matières premières',
    'crowdfunding',
    'entreprises locales',
  ];
  preferredDomainsOptions = [
    'ACTIONS',
    'CRYPTOCURRENCIES',
    'REAL_ESTATE',
    'BONDS',
    'STARTUPS',
    'COMMODITIES',
    'ETF',
    'FUNDRAISING',
    'SOCIAL_INVESTMENT',
  ];

  userId: string | null = null;
  userDateOfBirth: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')?.replace(/"/g, '') || null;

    // Fetch the user's age using the UserService
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user: UserResponse) => {
          const calculatedAge = this.calculateAge(user.birthDate);

          // Initialize the form with the calculated age
          this.userProfileForm = this.fb.group({
            userId: [this.userId || '', Validators.required],
            city: ['', Validators.required],
            age: [calculatedAge, [Validators.required, Validators.min(0)]], // Autofilled age
            gender: ['', Validators.required],
            riskTolerance: ['', Validators.required],
            financialObjective: ['', Validators.required],
            investmentFrequency: ['', Validators.required],
            preferredSector: ['', Validators.required],
            investmentHistory: [[], Validators.required],
            preferredDomains: [[], Validators.required],
            income: [0, [Validators.required, Validators.min(0)]],
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch user details. Please try again later.',
          });
        },
      });
    }
  }

  /**
   * Calculates the age based on the provided date of birth.
   * @param birthDate - User's date of birth in ISO format.
   * @returns Calculated age as a number.
   */
  private calculateAge(birthDate: string): number {
    const birthDateObj = new Date(birthDate);
    const ageDiff = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  /**
   * Handles form submission and calls the UserProfileService to save the data.
   */
  onSubmit(): void {
    if (this.userProfileForm.valid) {
      const profileData: UserProfileRequest = this.userProfileForm.value;

      // Send profile data to the service
      this.userProfileService.createUserProfile(profileData).subscribe({
        next: () => {
          // Store form values in local storage
          localStorage.setItem('userProfile', JSON.stringify(profileData));

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Profile created successfully!',
          }).then(() => {
            this.router.navigate(['/user-dashboard']);
          });
          this.userProfileForm.reset();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to create profile. ${err.message || ''}`,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly.',
      });
    }
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
      }, 1000);
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
          fixedTop.style.top = scrollTop > 45 ? '-45px' : '0';
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
