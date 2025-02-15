import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './components/home-layout-component/home-layout-component.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EmailVerifNotifComponent } from './components/email-verif-notif/email-verif-notif.component';
import { KycTriggerPageComponent } from './components/kyc-trigger-page/kyc-trigger-page.component';
import { EmailFailledComponent } from './components/email-failled/email-failled.component';
import { VerificationSuccessComponent } from './components/verification-success/verification-success.component';
import { VerifyEmailInstructionComponent } from './components/verify-email-instruction/verify-email-instruction.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeLayoutComponent, // ------ the parent --------
    children: [
      { path: '', component: HomeComponent }, //---- Rendering HomeComponent inside the layout  ---
    ],
  },

  { path: 'login',component: LoginPageComponent },
  { path: 'register',component: RegisterPageComponent },
  { path: 'user-dashboard',component: UserDashboardComponent },
  { path: 'User-Profile',component: UserProfileComponent },
  { path: 'email-verif-notif',component: EmailVerifNotifComponent },
  { path: 'kyc-trigger-page',component: KycTriggerPageComponent },
  { path: 'email-failled',component: EmailFailledComponent },
  { path: 'verify-email-instruction', component: VerifyEmailInstructionComponent },
  { path: 'success', component: VerificationSuccessComponent },
];
