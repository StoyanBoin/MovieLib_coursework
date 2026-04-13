import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Movies } from './features/movies/movies';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'movies', component: Movies },

    { path: 'login', component: Login },
    { path: 'register', component: Register },
];
