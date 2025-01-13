import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {
  constructor(private titleService: Title) {
    // Set the page title
    this.titleService.setTitle('User - Profil');
  }
}
