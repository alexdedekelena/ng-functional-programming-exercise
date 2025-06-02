import { MapReduceService } from './services/map-reduce-service.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private readonly mapReduceService: MapReduceService) {
    this.mapReduceService.logTestFunction();
  }
}
