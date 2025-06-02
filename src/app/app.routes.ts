import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
