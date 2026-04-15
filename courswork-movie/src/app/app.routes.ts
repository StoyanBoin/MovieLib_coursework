import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Movies } from './shared/components/movies/movies';
import { Blogs } from './shared/components/blogs/blogs';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'movies', component: Movies },
    { path: 'blogs', component: Blogs },

    { path: 'login', component: Login },
    { path: 'register', component: Register },
];
