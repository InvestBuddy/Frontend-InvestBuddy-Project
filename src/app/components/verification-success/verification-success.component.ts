import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import nécessaire
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-verification-success',
  templateUrl: './verification-success.component.html',
  imports: [CommonModule, RouterModule], // Ajoute CommonModule ici
  styleUrls: ['./verification-success.component.css']
})
export class VerificationSuccessComponent implements OnInit {
  userId: string | null = null;
  token: string | null = null;
  isLoading: boolean = true; // Pour afficher un état de chargement pendant le traitement
  isVerified: boolean = false; // Pour vérifier si la vérification est réussie

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Récupérer les paramètres depuis l'URL
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.userId && this.token) {
      console.log(`Verifying userId: ${this.userId}, token: ${this.token}`);
      this.isVerified = true; // Simule la réussite de la vérification
    } else {
      console.error('Verification failed: Missing parameters.');
      this.isVerified = false;
    }

    // Simule un délai de traitement (exemple)
    setTimeout(() => {
      this.isLoading = false;
      if (!this.isVerified) {
        alert('Verification failed. Please try again or contact support.');
        this.router.navigate(['/login']); // Redirige vers la page de connexion en cas d'échec
      }
    }, 2000); // Simule un délai de 2 secondes
  }
}
