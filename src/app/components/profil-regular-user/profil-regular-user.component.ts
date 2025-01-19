import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileResponse, UserProfileService } from 'src/app/services/user-profile.service';
import { UserService, UserResponse } from 'src/app/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ParticulesDashComponent } from "../shared/particules-dash/particules-dash.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profil-regular-user.component.html',
  styleUrls: ['./profil-regular-user.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ParticulesDashComponent],
})
export class ProfilRegularUserComponent implements OnInit {
  userProfile: UserProfileResponse | null = null; // User profile from UserProfileService
  userDetails: UserResponse | null = null; // User details from UserService
  loading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message, if any
  userId: string | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Use nullish coalescing to handle undefined values
    this.userId = localStorage.getItem('userId') ?? null;

    if (this.userId) {
      this.fetchUserData();
    } else {
      this.loading = false;
      this.errorMessage = 'User ID not found. Please log in again.';
    }
  }


  /**
   * Fetch user profile and user details.
   */
  private fetchUserData(): void {
    this.loading = true;

    // Fetch the user profile
    this.userProfileService.getUserProfile(this.userId!).subscribe({
      next: (profile) => {
        this.userProfile = profile;

        // Fetch additional user details
        this.userService.getUserById(this.userId!).subscribe({
          next: (details) => {
            this.userDetails = details;
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.errorMessage = 'Failed to fetch user details. Please try again later.';
          },
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to fetch user profile. Please try again later.';
      },
    });
  }

  /**
   * Handles form submission and calls the UserProfileService to save the data.
   */
  // onSubmit(): void {
  //   if (this.userProfileForm.valid) {
  //     const profileData: UserProfileRequest = this.userProfileForm.value;

  //     // Send profile data to the service
  //     this.userProfileService.createUserProfile(profileData).subscribe({
  //       next: () => {
  //         // Store form values in local storage
  //         localStorage.setItem('userProfile', JSON.stringify(profileData));

  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Success',
  //           text: 'Profile created successfully!',
  //         }).then(() => {
  //           this.router.navigate(['/user-dashboard']);
  //         });
  //         this.userProfileForm.reset();
  //       },
  //       error: (err) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: `Failed to create profile. ${err.message || ''}`,
  //         });
  //       },
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Validation Error',
  //       text: 'Please fill all required fields correctly.',
  //     });
  //   }
  // }



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
