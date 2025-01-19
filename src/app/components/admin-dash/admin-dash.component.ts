import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { UserService, UserResponse } from 'src/app/services/user.service';
import { UserProfileService, UserProfileResponse } from 'src/app/services/user-profile.service';

import {
  ChartComponent,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexTheme
} from 'ngx-apexcharts';
import { ParticulesDashComponent } from '../shared/particules-dash/particules-dash.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  theme?: ApexTheme;
};

@Component({
  selector: 'app-admin-dash',
  standalone: true, // Indicate this is a standalone component
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxApexchartsModule,
    CommonModule, RouterModule, ReactiveFormsModule, ParticulesDashComponent // Add the ApexCharts module here
  ],
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  users: UserResponse[] = [];
  userProfiles: UserProfileResponse[] = [];
  totalUsers: number = 0;
  riskToleranceData: { [key: string]: number } = {};
  incomeChartOptions: Partial<ChartOptions> | any;
  riskChartOptions: Partial<ChartOptions> | any;

  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadUserProfiles();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.totalUsers = data.length;
        this.initIncomeChart();
      },
      error: (err) => console.error('Failed to load users:', err)
    });
  }

  loadUserProfiles(): void {
    this.userProfileService.getAllUserProfiles().subscribe({
      next: (profiles) => {
        this.userProfiles = profiles;
        this.calculateRiskToleranceDistribution();
        this.initRiskChart();
      },
      error: (err) => console.error('Failed to load user profiles:', err)
    });
  }

  calculateRiskToleranceDistribution(): void {
    this.riskToleranceData = { LOW: 0, MEDIUM: 0, HIGH: 0 };
    this.userProfiles.forEach((profile) => {
      this.riskToleranceData[profile.riskTolerance]++;
    });
  }

  initIncomeChart(): void {
    this.incomeChartOptions = {
      series: [
        {
          name: 'Income',
          data: this.userProfiles.map((profile) => profile.income)
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      xaxis: {
        categories: this.users.map((user) => `${user.firstName} ${user.lastName}`),
        title: { text: 'Users' }
      },
      dataLabels: { enabled: false },
      title: {
        text: 'User Income Distribution',
        align: 'center'
      },
      theme: {
        mode: 'light',
        palette: 'palette2'
      }
    };
  }

  initRiskChart(): void {
    this.riskChartOptions = {
      series: Object.values(this.riskToleranceData),
      chart: {
        type: 'donut',
        height: 350
      },
      labels: Object.keys(this.riskToleranceData),
      title: {
        text: 'Risk Tolerance Distribution',
        align: 'center'
      },
      theme: {
        mode: 'light',
        palette: 'palette1'
      }
    };
  }
}
