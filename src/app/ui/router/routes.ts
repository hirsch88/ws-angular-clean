import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () =>
      import('../views/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'checkout',
    title: 'Checkout',
    loadComponent: () =>
      import('../views/checkout.component').then(m => m.CheckoutComponent),
  },
]
