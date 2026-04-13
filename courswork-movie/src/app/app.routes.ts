import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Movies } from './features/movies/movies';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'movies', component: Movies }
];
