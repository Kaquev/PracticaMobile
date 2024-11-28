import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage), canActivate: [AuthGuard] },
  { path: 'productos', loadComponent: () => import('./pages/productos/productos.page').then(m => m.ProductosPage), canActivate: [AuthGuard] },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];