import { Routes } from '@angular/router';
import { UnidadeComponent } from './pages/unidade/unidade.component';
import { LoginRedirectComponent } from './pages/login-redirect/login-redirect.component';
import { UsersComponent } from './pages/users/users.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'unidade', component: UnidadeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'formulario',
    loadComponent: () =>
      import('./pages/formulario/formulario.component').then(
        (m) => m.FormularioComponent
      ),
  },
  { path: 'login-redirect', component: LoginRedirectComponent },
  { path: '', redirectTo: '/login-redirect', pathMatch: 'full' },
  { path: '**', redirectTo: '/login-redirect' },
];
