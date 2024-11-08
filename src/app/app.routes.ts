import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { UnidadeComponent } from './pages/unidade/unidade.component';
import { HomeComponent } from './pages/home/home.component';
import { BoletinsComponent } from './pages/boletins/boletins/boletins.component';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, children: [
        { path: 'unidade', component: UnidadeComponent },
        { path: ':id/tuberculose', component: BoletinsComponent },
        { path: ':id/hanseniase', component: BoletinsComponent },
    ] },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: '**', redirectTo: '/auth' }
];
