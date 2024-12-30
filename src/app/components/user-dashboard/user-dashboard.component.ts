import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Import Chart.js
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
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
  private initializePerformanceChart(): void {
    const performanceCtx = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (performanceCtx) {
      new Chart(performanceCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Portfolio Growth',
              data: [1000, 1500, 2000, 2500, 3000, 4000],
              borderColor: '#007bff',
              fill: false,
              tension: 0.4,
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
        },
      });
    }
  }
}
