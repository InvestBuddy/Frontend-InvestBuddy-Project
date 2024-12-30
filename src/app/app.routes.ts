import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './components/home-layout-component/home-layout-component.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeLayoutComponent, // ------ the parent --------
    children: [
      { path: '', component: HomeComponent }, //---- Rendering HomeComponent inside the layout  ---
    ],
  },
  
  {  path: 'login',component: LoginPageComponent },
  { path: 'register',component: RegisterPageComponent }
];
