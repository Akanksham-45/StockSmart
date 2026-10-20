
import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
import { Inventory } from './inventory/inventory';
import { Locations } from './locations/locations';
import { Suppliers } from './suppliers/suppliers';
import { Orders } from './orders/orders';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
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
        path: 'inventory',
        component: Inventory
      },
      {
        path: 'locations',
        component: Locations
      },
      {
        path: 'suppliers',
        component: Suppliers
      },
      {
        path: 'orders',
        component: Orders
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
