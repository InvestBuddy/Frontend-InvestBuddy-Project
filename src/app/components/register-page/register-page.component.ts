import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  registerForm: FormGroup;
  // formFields = [
  //   { id: 'firstName', controlName: 'firstName', label: 'First Name', icon: 'fas fa-user me-2', type: 'text', placeholder: 'First Name' },
  //   { id: 'lastName', controlName: 'lastName', label: 'Last Name', icon: 'fas fa-user-tag me-2', type: 'text', placeholder: 'Last Name' },
  //   { id: 'email', controlName: 'email', label: 'Email', icon: 'fas fa-envelope me-2', type: 'email', placeholder: 'name@example.com' },
  //   { id: 'phone', controlName: 'phone', label: 'Phone Number', icon: 'fas fa-phone me-2', type: 'tel', placeholder: 'Phone Number' },
  //   { id: 'birthDate', controlName: 'birthDate', label: 'Date of Birth', icon: 'fas fa-calendar-alt me-2', type: 'date', placeholder: 'Date of Birth' },
  //   { id: 'address', controlName: 'address', label: 'Address', icon: 'fas fa-map-marker-alt me-2', type: 'text', placeholder: 'Address' },
  //   { id: 'password', controlName: 'password', label: 'Password', icon: 'fas fa-lock me-2', type: 'password', placeholder: 'Password' },
  //   { id: 'confirmPassword', controlName: 'confirmPassword', label: 'Confirm Password', icon: 'fas fa-lock me-2', type: 'password', placeholder: 'Confirm Password' },
  // ];


  constructor(private fb: FormBuilder, private authService: AuthService,private titleService: Title, private router: Router) {
    // Définir le titre ici
    this.titleService.setTitle('IB - Register Page');
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\+\\d{1,15}$'), // Match backend's regex for phone number
        ],
      ],
      password: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required], // Ensure date picker provides `YYYY-MM-DD`
    });

  }



  isInvalid(controlName: string): any {
    const control = this.registerForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('email')) return 'Invalid email address.';
    if (control?.hasError('minlength')) return 'Password must be at least 6 characters.';
    if (control?.hasError('pattern')) return 'Invalid phone number.';
    return '';
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;

      this.authService.registerUser(payload).subscribe(
        (response) => {
          // Redirection vers la page d'instruction
          this.router.navigate(['/verify-email-instruction']);
        },
        (error) => {
          console.error('Error during registration:', error);
          alert('Registration failed: ' + (error.error || 'Unknown error'));
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
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
