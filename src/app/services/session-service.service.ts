import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private userId: string | null = null;

  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return this.userId || localStorage.getItem('userId');
  }

  clearSession(): void {
    this.userId = null;
    localStorage.removeItem('userId');
  }
}
