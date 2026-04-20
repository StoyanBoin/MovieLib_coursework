import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.Home) },
    { path: 'movies', loadComponent: () => import('./shared/components/movies/movies').then(m => m.Movies) },
    { path: 'movie-list', redirectTo: 'movies', pathMatch: 'full' },
    { path: 'new-movie', loadComponent: () => import('./shared/components/movies/new-movie/new-movie').then(m => m.NewMovie), canActivate: [authGuard] },
    { path: 'favorites', loadComponent: () => import('./shared/components/favorites/favorites').then(m => m.Favorites), canActivate: [authGuard] },
    { path: 'profile', loadComponent: () => import('./features/profile/profile').then(m => m.Profile), canActivate: [authGuard] },

    { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
    { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) },
    { path: '**', loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound) },
];
