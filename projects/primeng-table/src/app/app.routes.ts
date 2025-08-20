import { Routes } from '@angular/router';

import { productsRoutes } from './features/products';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', children: productsRoutes },
];
