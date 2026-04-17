import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Movies } from './shared/components/movies/movies';
import { NewMovie } from './shared/components/movies/new-movie/new-movie';
import { Blog } from './shared/components/blog/blog';
import { Favorites } from './shared/components/favorites/favorites';
import { authGuard } from './core/guards/auth.guard';
import { Profile } from './features/profile/profile';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'movies', component: Movies },
    { path: 'new-movie', component: NewMovie, canActivate: [authGuard] },
    { path: 'blog', component: Blog },
    { path: 'favorites', component: Favorites, canActivate: [authGuard] },
    { path: 'profile', component: Profile },

    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '**', component: NotFound}
];
