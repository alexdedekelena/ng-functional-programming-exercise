import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CalculatorStateService } from './services/state/calculator-state.service';
import { CalculatorForm } from './interfaces/calculator-form.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator-ui',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    Toast,
  ],
  templateUrl: './calculator-ui.component.html',
  styleUrl: './calculator-ui.component.css',
})
export class CalculatorUIComponent {
  constructor() {
    this.calculatorForm.controls.expression.valueChanges
      .pipe(
        tap((value) => this.calculatorStateService.setExpression(value || '')),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  // Services Injection
  calculatorStateService = inject(CalculatorStateService);
  isExpressionValid = this.calculatorStateService.isExpressionValid;
  history = this.calculatorStateService.history;

  calculatorForm: FormGroup<CalculatorForm> = new FormGroup({
    expression: new FormControl(
      this.calculatorStateService.expression() || '',
      [
        Validators.required,
        Validators.maxLength(30), // Not specified
      ]
    ),
  });

  submitEvaluation() {
    this.calculatorStateService.addExpressionResultToHistory();
  }
}
