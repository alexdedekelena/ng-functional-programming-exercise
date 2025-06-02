import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home/home.component';
import { CalculatorUIComponent } from './features/calculator-ui/calculator-ui.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calculator', component: CalculatorUIComponent },
  { path: '**', component: HomeComponent },
];
