import { computed, effect, Injectable, signal } from '@angular/core';
import { evaluate } from '@suprnation/evaluator';
import { CalculatorState } from './calculator-state.interface';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CalculatorStateService {
  constructor(private messageService: MessageService) {
    // Error Message
    effect(() => {
      if (this.errorMessage()) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMessage(),
        });
        this.setErrorMessage('');
      }

      if (this.successMessage()) {
         this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.successMessage(),
        });
      }
    });
  }

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

  /** Evaluates the current expression, creates a new history item and add it to the history array.
   * Validates that only latest 5 results are displayed
   * If error ocurrs on evaluation set proper error message
   */
  addExpressionResultToHistory() {
    const evaluationResult = evaluate(this.expression());
    const historyItem = { ...evaluationResult, expression: this.expression() };

    if (this.history().length >= 5) {
      this.history().pop();
    }

    this.state.update((state) => ({
      ...state,
      errorMessage: !evaluationResult.success ? evaluationResult.reason : '',
      successMessage: evaluationResult.success
        ? `Value: ${evaluationResult.value}`
        : '',
      history: [historyItem, ...state.history],
    }));
  }

  resetState() {
    this.state.update(() => this.initialState);
  }
}
