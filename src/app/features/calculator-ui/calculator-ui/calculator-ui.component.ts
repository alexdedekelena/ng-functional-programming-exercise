import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { evaluate } from '@suprnation/evaluator';

@Component({
  selector: 'app-calculator-ui',
  imports: [CommonModule],
  templateUrl: './calculator-ui.component.html',
  styleUrl: './calculator-ui.component.css',
})
export class CalculatorUIComponent {
  expression = evaluate('1+2+sin(24+cos(23))');
}
