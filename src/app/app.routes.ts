import { Routes } from '@angular/router';
import { UnidadeComponent } from './pages/unidade/unidade.component';
import { LoginRedirectComponent } from './pages/login-redirect/login-redirect.component';
import { UsersComponent } from './pages/users/users.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { BoletinsComponent } from './pages/boletins/boletins.component';

export const routes: Routes = [
  { path: 'unidade', component: UnidadeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'formulario', component: FormularioComponent },
  {
    path: 'boletim/:tipo/:distrito/:unidade',
    component: BoletinsComponent,
  },
  { path: 'login-redirect', component: LoginRedirectComponent },
  { path: '', redirectTo: '/login-redirect', pathMatch: 'full' },
  { path: '**', redirectTo: '/login-redirect' },
];
