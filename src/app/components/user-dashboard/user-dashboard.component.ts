import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Import Chart.js
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements AfterViewInit {
  constructor(private titleService: Title) {
    // Set the page title
    this.titleService.setTitle('User - Dashboard');
  }

  // Lifecycle hook to initialize charts after the view is rendered
  ngAfterViewInit(): void {
    this.initializePortfolioChart();
    this.initializePerformanceChart();

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

  // Method to initialize the portfolio allocation chart
  private initializePortfolioChart(): void {
    const portfolioCtx = document.getElementById('portfolioChart') as HTMLCanvasElement;
    if (portfolioCtx) {
      new Chart(portfolioCtx, {
        type: 'pie',
        data: {
          labels: ['Stocks', 'ETFs', 'Bonds', 'Crypto'],
          datasets: [
            {
              data: [40, 30, 20, 10],
              backgroundColor: ['#007bff', '#6f42c1', '#e83e8c', '#ffc107'],
            },
          ],
        },
      });
    }
  }

  // Method to initialize the performance trends chart
  // Method to initialize the enhanced performance trends chart
private initializePerformanceChart(): void {
  const performanceTrendsCtx = document.getElementById('performanceTrendsChart') as HTMLCanvasElement;
  if (performanceTrendsCtx) {
    new Chart(performanceTrendsCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Portfolio Value',
            data: [1000, 1500, 2000, 2700, 3400, 4200, 5000],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#007bff',
            tension: 0.4, // Smooth curves
            borderWidth: 3,
          },
          {
            label: 'Market Index',
            data: [950, 1450, 1950, 2500, 3200, 4000, 4700],
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            pointBackgroundColor: '#28a745',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#28a745',
            tension: 0.4, // Smooth curves
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) =>
                `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#555',
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Portfolio Value ($)',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: '#555',
            },
            ticks: {
              callback: (value: any) => `$${value.toLocaleString()}`,
            },
          },
        },
      },
    });
  }
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
toggleSidebar(): void {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.main-content');
  if (sidebar && content) {
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
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
