import { FunctionalTokeniserService } from './services/functional-tokeniser-service.service';
import { MapReduceService } from './services/map-reduce-service.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layout/navbar/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private readonly mapReduceService: MapReduceService, private readonly functionalTokeniserService: FunctionalTokeniserService) {
    console.log('--- Map Reduce functions ---');
    this.mapReduceService.logTestFunction();

    console.log('--- Functional Tokeniser ----');
    this.functionalTokeniserService.logTestOperator();
  }
}
