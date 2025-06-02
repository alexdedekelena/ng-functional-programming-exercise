import { computed, Injectable, signal } from '@angular/core';
import { evaluate } from '@suprnation/evaluator';
import { CalculatorState } from './calculator-state.interface';

@Injectable({
  providedIn: 'root',
})
export class CalculatorStateService {
  constructor() {}

  // Signal that holds the state (initial state)
  private readonly initialState = {
    expression: '',
    isExpressionValid: true,
    history: [],
    errorMessage: '',
    successMessage: '',
  };

  private state = signal<CalculatorState>(this.initialState);

  // Selectors (slices of state)
  expression = computed(() => this.state().expression);
  isExpressionValid = computed(() => this.state().isExpressionValid);
  history = computed(() => this.state().history);

  errorMessage = computed(() => this.state().errorMessage);
  successMessage = computed(() => this.state().successMessage);

  // Define how actions should update state
  setExpression(expression: string) {
    const result = evaluate(expression);

    this.state.update((state) => ({
      ...state,
      expression,
      isExpressionValid: result.success,
    }));
  }

  setErrorMessage(errorMessage: string) {
    this.state.update((state) => ({
      ...state,
      errorMessage,
    }));
  }

  setSuccessMessage(successMessage: string) {
    this.state.update((state) => ({
      ...state,
      successMessage,
    }));
  }

  // Actions
  addExpressionResultToHistory() {
    const evaluationResult = evaluate(this.expression());

    this.state.update((state) => ({
      ...state,
      history: [
        ...state.history,
        { ...evaluationResult, expression: this.expression() },
      ],
    }));
  }

  resetState() {
    this.state.update(() => this.initialState);
  }
}
