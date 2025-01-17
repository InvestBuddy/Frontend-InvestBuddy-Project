import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

// Import Chart.js
import Chart from 'chart.js/auto';
import { PredictionService, PredictionResponse } from 'src/app/services/prediction.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements AfterViewInit {
  predictionResponse: PredictionResponse | null = null;

  constructor(
    private titleService: Title,
    private predictionService: PredictionService
  ) {
    // Set the page title
    this.titleService.setTitle('User - Dashboard');
  }

  onLogout(): void {
    // Logic to handle logout
    console.log('Logout triggered!');
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have successfully logged out.',
    }).then(() => {
      window.location.href = '/';
    });
  }

  // Lifecycle hook to initialize charts after the view is rendered
  ngAfterViewInit(): void {
    this.fetchPredictionData();

    // Initialize features after DOM is rendered
    this.initSpinner();
    this.initWOW();
    this.initFixedNavbar();
    this.initBackToTop();
    this.initCounters();
    this.initProjectCarousel();
    this.initTestimonialCarousel();
    this.initHeaderCarousel();

    console.log(localStorage.getItem('userId'));
  }
  private fetchPredictionData(): void {
    const storedData = localStorage.getItem('userProfile');
    if (!storedData) {
      Swal.fire({
        icon: 'warning',
        title: 'No Profile Found',
        text: 'Please complete your profile first.',
      });
      return;
    }

    // Parse the stored user profile data
    const userProfile = JSON.parse(storedData);

    // Transform the data to match the expected prediction format
    const formattedPredictionRequest = {
      Gender: userProfile.gender.toLowerCase(),
      City: userProfile.city,
      Age: userProfile.age,
      Income: userProfile.income,
      Risk_Tolerance: this.mapRiskTolerance(userProfile.riskTolerance),
      Investment_History: userProfile.investmentHistory.map((item: string) =>
        this.mapInvestmentHistory(item)
      ),
      Financial_Objective: this.mapFinancialObjective(userProfile.financialObjective),
      Preferred_Sector: this.mapPreferredSector(userProfile.preferredSector),
      Investment_Frequency: this.mapInvestmentFrequency(userProfile.investmentFrequency),
      PreferredDomain: userProfile.preferredDomains.map((domain: string) =>
        this.mapPreferredDomain(domain)
      ),
    };

    // Log the formatted request to verify its structure and values
    console.log("Formatted Prediction Request:", JSON.stringify(formattedPredictionRequest, null, 2));

    // Send the formatted data to the prediction service
    this.predictionService.sendPredictionRequest(formattedPredictionRequest).subscribe({
      next: (response: PredictionResponse) => {
        this.predictionResponse = response;
        console.log("Prediction Response:", response); // Log the response for debugging
        this.initializeCharts(response);
        Swal.fire({
          icon: 'success',
          title: 'Prediction Success',
          text: `Recommended Domain: ${response.recommended_domain}`,
        });
      },
      error: (err) => {
        console.error("Prediction Error Response:", err); // Log the error response
        Swal.fire({
          icon: 'error',
          title: 'Prediction Error',
          text: 'There was an error while generating predictions.',
        });
      },
    });
  }


  private initializeCharts(response: PredictionResponse): void {
    this.initializePortfolioChart(response);
    this.initializePerformanceChart(response);
  }

  private initializePortfolioChart(response: PredictionResponse): void {
    const portfolioCtx = document.getElementById('portfolioChart') as HTMLCanvasElement;
    if (portfolioCtx) {
      const data = [
        ...response.preferred_domains_sent.map(() => 30), // Assign equal weight for preferred domains
        40, // Assign higher weight for the recommended domain
      ];
      const labels = [
        ...response.preferred_domains_sent,
        response.recommended_domain,
      ];

      new Chart(portfolioCtx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ['#007bff', '#6f42c1', '#ffc107'],
            },
          ],
        },
      });
    }
  }

  private initializePerformanceChart(response: PredictionResponse): void {
    const performanceTrendsCtx = document.getElementById('performanceTrendsChart') as HTMLCanvasElement;
    if (performanceTrendsCtx) {
      const labels = [...response.preferred_domains_sent, response.recommended_domain];
      const data = labels.map((label) =>
        label === response.recommended_domain ? 70 : 30 // Assign higher score for the recommended domain
      );

      new Chart(performanceTrendsCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Domains Contribution',
              data: data,
              backgroundColor: labels.map((label) =>
                label === response.recommended_domain ? '#ffc107' : '#007bff'
              ),
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Domains',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Contribution Score',
              },
            },
          },
        },
      });
    }
  }

  //------------ Mapping functions ---------------------
  private mapGender(gender: string): string {
    const genderMap: Record<string, string> = { MAN: 'man', WOMAN: 'woman' };
    return genderMap[gender.toUpperCase()] || gender.toLowerCase();
  }

  private mapRiskTolerance(riskTolerance: string): string {
    const riskToleranceMap: Record<string, string> = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high' };
    return riskToleranceMap[riskTolerance.toUpperCase()] || riskTolerance.toLowerCase();
  }

  private mapInvestmentHistory(item: string): string {
    const investmentHistoryMap: Record<string, string> = {
      IMMOBILIER: 'immobilier',
      ACTIONS: 'actions',
    };
    return investmentHistoryMap[item.toUpperCase()] || item.toLowerCase();
  }

  private mapFinancialObjective(objective: string): string {
    const financialObjectives: Record<string, string> = {
      RETIREMENT: 'retraite',
      SAVINGS: 'épargne de sécurité',
      REAL_ESTATE_PURCHASE: 'achat immobilier',
      CHILDREN_EDUCATION: 'éducation des enfants',
      TRAVEL: 'voyages',
      STARTER_SAVINGS: 'épargne de départ',
      EDUCATION_INVESTMENT: 'investir dans l\'éducation',
    };
    return financialObjectives[objective.toUpperCase()] || objective.toLowerCase();
  }


  private mapPreferredSector(sector: string): string {
    const preferredSectors: Record<string, string> = {
      TECHNOLOGY: 'Technologie',
      HEALTH: 'Santé',
      ENERGY: 'Énergie',
      FINANCE: 'Finance',
      INDUSTRY: 'Industrie',
      CONSUMPTION: 'Consommation',
      REAL_ESTATE: 'Immobilier',
      AGRICULTURE: 'Agriculture',
      PHARMACEUTICAL: 'Pharmaceutique',
    };
    return preferredSectors[sector.toUpperCase()] || sector.toLowerCase();
  }

  private mapInvestmentFrequency(frequency: string): string {
    const investmentFrequencies: Record<string, string> = {
      MENSUEL: 'mensuel',
      TRIMESTRIEL: 'trimestriel',
      ANNUEL: 'annuel',
    };
    return investmentFrequencies[frequency.toUpperCase()] || frequency.toLowerCase();
  }

private mapPreferredDomain(domain: string): string {
  const preferredDomains: Record<string, string> = {
    ACTIONS: 'Actions',
    CRYPTOCURRENCIES: 'Cryptomonnaies',
    REAL_ESTATE: 'Immobilier',
    BONDS: 'Obligations',
    STARTUPS: 'Startups',
    COMMODITIES: 'Matières premières',
    ETF: 'ETF',
    FUNDRAISING: 'Fundraising',
    SOCIAL_INVESTMENT: 'Investissement Socialement Responsable'
  };
  return preferredDomains[domain.toUpperCase()] || domain.toUpperCase();
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
