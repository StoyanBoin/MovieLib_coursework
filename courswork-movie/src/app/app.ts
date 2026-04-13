import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Home } from './features/home/home';
import { Movies } from './features/movies/movies';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Home, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
