
import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'products',
    component: Products
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
