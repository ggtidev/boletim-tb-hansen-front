import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { UnidadeComponent } from './pages/unidade/unidade.component';

export const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    {path: 'unidade', component: UnidadeComponent},
    {path: '', redirectTo:'/auth', pathMatch:'full'}
];
