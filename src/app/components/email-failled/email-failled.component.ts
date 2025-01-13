import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-failled',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './email-failled.component.html',
  styleUrl: './email-failled.component.css'
})
export class EmailFailledComponent {
  constructor(private titleService: Title) {
    // Set the page title
    this.titleService.setTitle('Email Failled');
  }
}
